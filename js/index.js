// Constants
const minimumCopies = 1
const minimumCards = 1
const minimumLest = 1
const initSerial = 'COD'

const qrCodeConfig = {
  prefix: "PAP-",
  digits: 4,
  emptyFill: "0" ,
  
}

// Capture the generate button and on click execute the generate function
const generateButton = document.getElementById("generate-button")
generateButton.addEventListener("click", generate)

// Generate the QR Codes - This is the MAIN function
function generate() {
  clearQRCode()
  
  const copies = captureCopies()
  const cards = captureCards()
  const lest = captureLest()
  const serial = captureSerial()
  for (let card = 1; card <= cards; card++) {
    for (let copy = 1; copy <= copies; copy++) {
      
      createQRCode((lest+0), copy, serial)
    }
  }
}

function captureSerial(){
  // Capture the input with id serial value and convert to integer
  const serial = document.getElementById("serial").value

  return serial || initSerial
}

function captureLest() {
  let response
  // Capture the input with id copies value and convert to integer
  const copies = document.getElementById("lest").value
  if (!copies || copies === "") {
    response = minimumLest
  }
  // Transform into a number
  const copiesInt = parseInt(copies)

  // Check if the value is a number
  if (isNaN(copiesInt) || copiesInt < minimumLest) {
    response = minimumLest
  } else {
    response = copiesInt
  }

  return response
}

// Capture the init the card input and return the value in number
function captureCopies() {
  let response
  // Capture the input with id copies value and convert to integer
  const copies = document.getElementById("copies").value
  if (!copies || copies === "") {
    response = minimumCopies
  }
  // Transform into a number
  const copiesInt = parseInt(copies)

  // Check if the value is a number
  if (isNaN(copiesInt) || copiesInt < minimumCopies) {
    response = minimumCopies
  } else {
    response = copiesInt
  }

  return response
}

// Capture the Cards input and return the value in number
function captureCards() {
  let response
  // Capture the input with id copies value and convert to integer
  const cards = document.getElementById("cards").value
  if (!cards || cards === "") {
    response = minimumCards
  }
  // Transform into a number
  const cardsInt = parseInt(cards)

  // Check if the value is a number
  if (isNaN(cardsInt) || cardsInt < minimumCards) {
    response = minimumCards
  } else {
    response = cardsInt
  }

  return response
}

function clearQRCode() {
  const qrCodeWrapper = document.getElementById("qr-codes-wrapper")
  qrCodeWrapper.innerHTML = ""
}

function createQRCode(index, copy, serial) {
  // criando um elemento parent do qr code e do nome
  const qrCodeCard = document.createElement("div")
  qrCodeCard.className = "card-qr-code"
  document.getElementById("qr-codes-wrapper").appendChild(qrCodeCard)

  // criando cada elemento html pro qr code
  const eachQrCode = document.createElement("div")
  eachQrCode.id = `qr-code-${index}-${copy}`
  qrCodeCard.appendChild(eachQrCode)

  // criando o nome do qr code
  const codeName =
    (serial + ' - ').toUpperCase()+
    index.toString().padStart(qrCodeConfig.digits, qrCodeConfig.emptyFill)

  // criando o elemento html do nome do qr code
  const qrCodeName = document.createElement("p")
  qrCodeName.innerHTML = `${codeName}`
  qrCodeCard.appendChild(qrCodeName)

  // iniciando o QR code dentro do elemento html criado
  new QRCode(`qr-code-${index}-${copy}`, codeName)
}

const generatePDF = document.getElementById("generate-pdf")
generatePDF.addEventListener("click", generatePdf)


const idPdf = document.getElementById('qr-codes-wrapper')

function generatePdf(){
  document.getElementById('controller').style.display = "none"
  window.print()
  setTimeout(() => {
    document.getElementById('controller').style.display = "block"
    
  }, 500);


    }
