class SecretSanta {

  constructor(names) {
    this.names = names;
    this.pairs = {};
  }

  makePairs = () => {
    this.names.forEach(santa => {
        this.assignRecipient(santa)
    })
    let mapContainer = document.getElementById("mapContainer")
    Object.keys(this.pairs).forEach(santa => {
      let mapAnchor = document.createElement("a")
      mapAnchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + this.setFileContents(santa))
      mapAnchor.setAttribute('download', '' + santa + '_secretSanta.txt')
      mapAnchor.innerText = santa
      mapContainer.appendChild(mapAnchor)
    })
    this.pairs = {} // TODO: best way to clear pairs?
  }

  assignRecipient = (santa) => {
    const possibleRecipients = this.names.filter(name => name != santa) // no self-matches
                                .filter(name => !Object.values(this.pairs).includes(name)) // no duplicate recipients
                                .filter(name => this.pairs[name] != santa) // no 2-way match loops
    if (santa !== this.names[this.names.length - 2] || Object.values(this.pairs).indexOf(this.names[this.names.length - 1] !== -1)) {
        this.pairs[santa] = possibleRecipients[Math.floor(Math.random() * possibleRecipients.length)]
    }
    else { // force assignment of final input to 2nd-to-last input if final input is not a recipient by then
        this.pairs[santa] = this.names[this.names.length - 1]
    }
  }

  setFileContents = (santa) => `Hi ${santa}, your pairing is with ${this.pairs[santa]}. Merry Christmas!`
  
}

const secretSanta = () => {
  // TODO: clear existing anchor tags
  const input = document.getElementById('input').value
  const names = input.split(',')
  names.forEach(name => name.trim())
  let obj = new SecretSanta(names)
  obj.makePairs()
  document.getElementById("output").style.display = ''
}