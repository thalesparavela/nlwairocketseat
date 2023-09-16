import ytdl from "ytdl-core"
import fs from "fs"
import { setUncaughtExceptionCaptureCallback } from "process"
import { error } from "console"

export const download = (videoID) => {
  // tratando url para possível download
  const videoURL = "https://www.youtube.com/shorts/" + videoID
  console.log("Realizando o download do vídeo :" + videoID)
  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      // tratando a informação de tempo do vídeo
      const seconds = info.formats[0].approxDurationMs / 1000
      console.log(seconds)
      if (seconds > 60) {
        throw new Error("A duração desse vídeo é maior do que 60 segundos")
      }
    })
    .on("end", () => {
      // exibindo mensagem de finalização
      console.log("Download do vídeo finalizado")
    })
    .on("error", (error) => {
      // error handling
      console.log("Não foi possível efetuar o download. Erro:\n" + error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4")) // criando um arquivo com o vídeo baixado
}
