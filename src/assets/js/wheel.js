
let onWheelResult; // Declare a global callback

const sectors = [
    { color: 'magenta', label: '10%' },
    { color: 'purple', label: '20%' },
    { color: 'gold', label: "Gift" },
    { color: 'magenta', label: '15%' },
    { color: 'purple', label: '40%' },
    { color: 'black', label: 'SPIN \n AGAIN' },
  ]

  const rand = (m, M) => Math.random() * (M - m) + m
  const tot = sectors.length
  const spinEl = document.querySelector('#spin')
  const ctx = document.querySelector('#wheel').getContext('2d')
  const dia = ctx.canvas.width
  const rad = dia / 2
  const PI = Math.PI
  const TAU = 2 * PI
  const arc = TAU / sectors.length


  const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0 // Angular velocity
  let ang = 0 // Angle in radians
  let spinnable = true

  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

  function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    // COLOR
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    // TEXT
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px sans-serif'
    ctx.width = 40
    if(sector.label.includes("\n")){
        ctx.fillText(sector.label.split("\n")[0], rad - 10, 0)
        ctx.fillText(sector.label.split("\n")[1], rad - 10, 20)
    } else {
        ctx.fillText(sector.label, rad - 10, 10)
    }

    //
    ctx.restore()
  }

  function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
    spinEl.textContent = (!angVel && spinnable) ? 'SPIN' : sector.label
    spinEl.style.background = sector.color
  }
  function setRandomProb(prob) {
    angVel=prob
  }

  function frame() {
    if (!angVel) return
    angVel *= friction // Decrement velocity by friction
    if (angVel < 0.002) {
        angVel = 0 // Bring to stop


        // remove display none from result-wheel

        if(spinEl.textContent != "SPIN \n AGAIN"){
            document.getElementById("result-wheel").style.display = "block";
            document.getElementById("result-wheel").click();
            spinnable = false;
        } else {

        }
    }
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    rotate()
  }

  function engine() {
    frame()
    requestAnimationFrame(engine)
  }

  function init() {
    sectors.forEach(drawSector)
    rotate() // Initial rotation
    engine() // Start engine
    spinEl.addEventListener('click', () => {


      let randNum = rand(0,1); // You can replace this with the actual logic used for randNum

      if (!angVel && spinnable) {

        if(randNum < 0.30){
            angVel = 0.51 // 10%
        }
        else if(randNum < 0.40){
            angVel = 0.48 // 15%
        }
        else if(randNum < 0.45){
            angVel = 0.50 // 20%
        }
        else if(randNum < 0.46){
            angVel = 0.47 // 40%
        }
        else if(randNum < 0.66){
            angVel = 0.49 // gift
        }
        else {
            angVel = 0.52 // spin again 46
        }

        // Call the callback with the result when spin ends
        if (typeof onWheelResult === 'function') {
          onWheelResult(randNum);
        }

        ang = 0 // Angle in radians
      }
    })
  }

  init()
