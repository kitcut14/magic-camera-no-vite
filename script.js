if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
}

const video = document.getElementById('camera')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const button = document.getElementById('shoot')
const preview = document.getElementById('preview')

navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => video.srcObject = stream)

button.addEventListener('click', () => {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  ctx.drawImage(video, 0, 0)

  // 即時プレビュー表示
  const previewUrl = canvas.toDataURL('image/png')
  preview.src = previewUrl
  preview.style.display = 'block'
  preview.requestFullscreen?.()

  setTimeout(() => {
    const heart = new Image()
    heart.src = 'heart3.png'
    heart.onload = () => {
      ctx.drawImage(heart, canvas.width - 100, canvas.height - 150, 80, 120)
      const finalUrl = canvas.toDataURL('image/png')
      preview.src = finalUrl
      download(finalUrl)
    }
  }, 30000)
})

function download(url) {
  const a = document.createElement('a')
  a.href = url
  a.download = 'magic_photo.png'
  a.click()
}
