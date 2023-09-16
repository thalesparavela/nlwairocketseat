import cors from "cors"
import express from "express"
import { download } from "./donwload.js"

const app = express() /* utilizando o express para criar um servidor*/
app.use(
  cors()
) /*garantia de que o códido esteja pronto para usar o protocolo HTTP*/

app.get("/summary/:id", (request, response) => {
  //utilizando a requisiçao no endereço acima para conseguir o parâmetro id do vídeo
  download(request.params.id) // classe download--função para baixar vídeo
  response.json({ result: "Download do vídeo realizado com sucesso!" }) //manda como resposta um .json
})

app.listen(3333, () => console.log("Server is running on port 3333"))
