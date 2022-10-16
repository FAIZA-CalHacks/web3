const axios = require("axios");

async function createBucket(creator, label, visibility, role) {
  let payload = {
    Creator: creator,
    Label: label,
    Visibility: visibility,
    Role: role,
  };

  let res = await axios.post(
    "http://localhost:4040/api/v1/bucket/create",
    payload
  );

  let data = res.data;
  console.log(data);

  return data;
}

async function getBucket(bucketDid) {
  let payload = {
    bucketDid: bucketDid,
  };

  let res = await axios.post(
    "http://localhost:4040/api/v1/bucket/get",
    payload
  );

  let data = res.data;
  console.log(data);

  return data;
}

async function updateItems(bucketDid, content) {
  let payload = {
    bucketDid: bucketDid,
    Content: content,
  };

  let res = await axios.post(
    "http://localhost:4040/api/v1/bucket/update-items",
    payload
  );

  let data = res.data;
  console.log(data);

  return data;
}

async function getSchemaDoc(cid) {
  let payload = {
    cid: cid,
  };

  let res = await axios.post(
    "http://localhost:4040/api/v1/schema-document/get",
    payload
  );

  let data = res.data;
  console.log(data);

  return data;
}

async function createSchemaDoc(creator, label, schema_did, fields) {
  //create NFT!!!
  let payload = {
    creator: creator,
    label: label,
    schema_did: schema_did,
    fields: fields,
  };

  let res = await axios.post(
    "http://localhost:4040/api/v1/schema-document/create",
    payload
  );

  let data = res.data;
  console.log(data);

  return data;
}

// const createB = createBucket(
//   "snr15pj6fr508xkrwgsaydvtr96xwpmul0g3cdj0aw",
//   "motherfucker",
//   "public",
//   "application"
// );

// const getB = getBucket("did:snr:440f0787917c4944a672da7b6a52c629");

// const updateI = updateItems("did:snr:1e040f77a511425b9e7434ff5c8f2130", [
//   {
//     name: "Contact Information",
//     uri: "bafyreiblalauakzcsftfi43v3vxg53cfd43mlqvlnoczpwwa6luqyksahm",
//     type: "cid",
//     schemaDid: "did:snr:3586437f-435b-4dd3-97ee-98697d15d49a",
//   },
// ]);

// const getSD = getSchemaDoc(
//   "bafyreiblalauakzcsftfi43v3vxg53cfd43mlqvlnoczpwwa6luqyksahm"
// );

async function createNFT(name, ownerID, postID) {
  const createSD = await createSchemaDoc(
    "snr15pj6fr508xkrwgsaydvtr96xwpmul0g3cdj0aw",
    "FirstUser",
    "did:snr:3586437f-435b-4dd3-97ee-98697d15d49a",
    {
      ownerID: ownerID,
      postID: postID,
    }
  );
  updateItems("did:snr:9aab549417dc4116826650ca174bd4b5", [
    {
      name: name,
      uri: createSD.cid,
      type: "cid",
      schemaDid: createSD.document.schema_did,
    },
  ]);
}

async function transferNFT(uri, newOwnerID) {
  //find current uri in bucket
  const res = getSchemaDoc(uri);

  //create new NFT
  const replace = await createSchemaDoc(
    "snr15pj6fr508xkrwgsaydvtr96xwpmul0g3cdj0aw",
    "Transfer",
    res.document.schema_did,
    {
      ownerID: newOwnerID,
      postID: res.document.fields[1].int_value[0].value,
    }
  );

  //update items, replace current NFT w new one

  //iterate
  var b = getBucket("did:snr:9aab549417dc4116826650ca174bd4b5").bucketDid;
  var i = 0;

  var newContent = []; //name,uri,type,schemaDid
  while (i < b.length) {
    if (b[i].uri === uri) {
      //Found!
      newContent.append({
        name: b[i].name,
        uri: replace.cid,
        type: "cid",
        schemaDid: "did:snr:3586437f-435b-4dd3-97ee-98697d15d49a",
      });
    } else {
      newContent.append({
        name: b[i].name,
        uri: b[i].cid,
        type: "cid",
        schemaDid: "did:snr:3586437f-435b-4dd3-97ee-98697d15d49a",
      });
    }
    i++;
  }
  updateItems("did:snr:9aab549417dc4116826650ca174bd4b5", newContent);
}

createNFT("First", 1, 1245);
