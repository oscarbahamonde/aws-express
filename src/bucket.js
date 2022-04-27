import aws from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config().parsed;
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function uploadOne(id, key, file) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: file,
    Prefix: id,
    ACL: "public-read",
  };
  return s3.upload(params).promise();
}

async function downloadOne(id, key) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Prefix: id,
  };
  return s3.getObject(params).promise();
}

async function deleteOne(id, key) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Prefix: id,
  };
  return s3.deleteObject(params).promise();
}

async function uploadMany(id, files) {
  const promises = files.map((file) => uploadOne(id, file.name, file));
  return Promise.all(promises);
}

async function downloadMany(id, keys) {
  const promises = keys.map((key) => downloadOne(id, key));
  return Promise.all(promises);
}

async function deleteMany(id, keys) {
  const promises = keys.map((key) => deleteOne(id, key));
  return Promise.all(promises);
}

async function getAll(id) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: id,
  };
  return s3.listObjects(params).promise();
}

async function getAllKeys(id) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: id,
  };
  const data = await s3.listObjects(params).promise();
  return data.Contents.map((content) => content.Key);
}

async function getAllFiles(id) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: id,
  };
  const data = await s3.listObjects(params).promise();
  return data.Contents.map((content) => content.Key);
}

async function toBase64(file) {
  return fs.readFileSync(file, { encoding: "base64" });
}

async function fromBase64(base64str) {
  let bitmap = Buffer.from(base64str, "base64");
  fs.writeFileSync(file, bitmap);
  return file;
}

fromBase64(fs.readFileSync("./.base64", { encoding: "base64" })).then((data) =>
  console.log(data)
);

async function Img64toURL(base64str) {
  return "data:image/png;base64," + base64str;
}

async function Music64toURL(base64str) {
  return "data:audio/mp3;base64," + base64str;
}

async function toURL(file) {
  return "https://s3.amazonaws.com/" + process.env.AWS_BUCKET + "/" + file;
}

async function toURLs(files) {
  return files.map((file) => toURL(file));
}

async function toBase64s(files) {
  return files.map((file) => toBase64(file));
}

class Bucket {
  constructor(files, id, key) {
    this.files = files;
    this.id = id;
    this.key = key;
  }
  uploadOne() {
    return uploadOne(this.id, this.key, this.files);
  }
  downloadOne() {
    return downloadOne(this.id, this.key);
  }
  deleteOne() {
    return deleteOne(this.id, this.key);
  }
  uploadMany() {
    return uploadMany(this.id, this.files);
  }
  downloadMany() {
    return downloadMany(this.id, this.files);
  }
  deleteMany() {
    return deleteMany(this.id, this.files);
  }
  getAll() {
    return getAll(this.id);
  }
  getAllKeys() {
    return getAllKeys(this.id);
  }
  getAllFiles() {
    return getAllFiles(this.id);
  }
  toBase64() {
    return toBase64(this.files);
  }
  fromBase64() {
    return fromBase64(this.files);
  }
  Img64toURL() {
    return Img64toURL(this.files);
  }
  Music64toURL() {
    return Music64toURL(this.files);
  }
  toURL() {
    return toURL(this.files);
  }
  toURLs() {
    return toURLs(this.files);
  }
  toBase64s() {
    return toBase64s(this.files);
  }
}

export default Bucket;
