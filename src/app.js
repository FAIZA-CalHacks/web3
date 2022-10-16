const express = require('express')
const cors = require('cors')

const { createNFT, transferNFT } = require('./nft.js')

const app = express()
app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
  res.send("NFTs... Nihal's Fingers & Toes")
})

app.post('/mint', async (req, res) => {
  try {
    const { title, post, owner } = req.body
    const nftCid = await createNFT(title, post, owner)
    res.status(201).json(nftCid)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

app.post('/transfer', async (req, res) => {
  try {
    const { nftCid, newOwner } = req.body
    const newNftCid = await transferNFT(nftCid, newOwner)
    res.status(201).json(newNftCid)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

const port = 3333
app.listen(port, () => {
  if (process.send) {
    process.send('online')
  }
  console.log('Server has started on port ' + port)
})
