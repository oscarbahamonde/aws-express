import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config().parsed;

const db = new AWS.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

async function createOne(id, params, table) {
  db.putItem(
    {
      Tableid: table,
      Item: {
        id: {
          S: id,
        },
        ...[params],
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function readOne(id, table) {
  db.getItem(
    {
      Tableid: table,
      Key: {
        id: {
          S: id,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function updateOne(id, params, table) {
  db.updateItem(
    {
      Tableid: table,
      Key: {
        id: {
          S: id,
        },
      },
      UpdateExpression: "set #id = :id",
      ExpressionAttributeids: {
        "#id": "id",
      },
      ExpressionAttributeValues: {
        ":id": {
          S: params.id,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function delOne(id, table) {
  db.deleteItem(
    {
      Tableid: table,
      Key: {
        id: {
          S: id,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}
async function createMany(params, table) {
  db.batchWriteItem(
    {
      RequestItems: {
        [table]: [
          {
            PutRequest: {
              Item: {
                id: {
                  S: params.id,
                },
                id: {
                  S: params.id,
                },
              },
            },
          },
        ],
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}
async function readMany(table) {
  db.scan(
    {
      Tableid: table,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function updateMany(params, table) {
  db.updateItem(
    {
      Tableid: table,
      Key: {
        id: {
          S: params.id,
        },
      },
      UpdateExpression: "set #id = :id",
      ExpressionAttributeids: {
        "#id": "id",
      },
      ExpressionAttributeValues: {
        ":id": {
          S: params.id,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function delMany(table) {
  db.batchExecuteStatement(
    {
      RequestItems: {
        [table]: [
          {
            DeleteRequest: {
              Key: {
                id: {
                  S: "1",
                },
              },
            },
          },
        ],
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function filterByQuery(params, table) {
  db.query(
    {
      Tableid: table,
      KeyConditionExpression: "#id = :id",
      ExpressionAttributeids: {
        "#id": "id",
      },
      ExpressionAttributeValues: {
        ":id": {
          S: params.id,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

async function filterByScan(params, table) {
  db.scan(
    {
      Tableid: table,
      FilterExpression: "#id = :id",
      ExpressionAttributeids: {
        "#id": "id",
      },
      ExpressionAttributeValues: {
        ":id": {
          S: params.id,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}

Input = {
  params,
  tableid,
};

class DB {
  constructor(Input) {
    this.params = Input.params;
    this.table = Input.table;
  }

  createOne() {
    createOne(this.params, this.table);
  }

  readOne() {
    readOne(this.params, this.table);
  }

  updateOne() {
    updateOne(this.params, this.table);
  }

  delOne() {
    delOne(this.params, this.table);
  }

  createMany() {
    createMany(this.params, this.table);
  }

  readMany() {
    readMany(this.params, this.table);
  }

  updateMany() {
    updateMany(this.params, this.table);
  }

  delMany() {
    delMany(this.params, this.table);
  }

  filterByQuery() {
    filterByQuery(this.params, this.table);
  }

  filterByScan() {
    filterByScan(this.params, this.table);
  }
}

export default DB;
