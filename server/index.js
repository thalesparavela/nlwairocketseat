import cors from "cors"

import express from "express"

import { convert } from "./convert.js"
import { download } from "./donwload.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
const app = express() /* utilizando o express para criar um servidor*/
app.use(express.json())
app.use(
  cors()
) /*garantia de que o códido esteja pronto para usar o protocolo HTTP*/

app.get("/summary/:id", async (request, response) => {
  try {
    //utilizando a requisiçao no endereço acima para conseguir o parâmetro id do vídeo
    await download(request.params.id) // classe download--função para baixar vídeo
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)
    return response.json({ result }) //manda como resposta um .json
  } catch (error) {
    return response.json({ error })
  }
})
app.post("/summary", async (request, response) => {
  try {
  
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    return response.json({ error })
  }
})
app.listen(3333, () => console.log("Server is running on port 3333"))
