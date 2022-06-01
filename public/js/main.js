var path;
fetch("/js/path.json")
   .then(response => response.json())
   .then(json => {
      path = json
      console.log(path)
   });

let redPath = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
let bluePath = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 70, 71, 72, 73, 74, 75]
let greenPath = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 58, 59, 60, 61, 62, 63]
let yellowPath = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 64, 65, 66, 67, 68, 69]
var key = 0;

let starPlace = [1, 9, 14, 22, 27, 35, 40, 48]








class Red {
   constructor(element, x, y, itsPath) {
      this.x = x
      this.y = y
      this.key = key++;
      this.color = element.classList[0]
      this.allPos = itsPath
      this.position = 0;
      this.red = element
      this.red.style.left = 1.2 + this.x + "px";
      this.red.style.top = 2 + this.y + "px";
      this.isActive = false
      this.allPositions = [{ x, y }]

   }

   getPosition() {
      if (this.allPositions.length < 50) {
         this.allPositions = [{ x: this.x, y: this.y }]
         for (let k of this.allPos) {
            this.allPositions.push(path[k])
         }
      }
      return this.allPositions
   }

   getCurrentPosition(i = this.position) {
      return this.getPosition()[i];
   }

   setActive(num) {
      this.isActive = ((num + this.position <= 57 && this.position > 0) || (this.position == 0 && num == 6))
   }

   setPostion(x, y, ele = this.red) {
      ele.style.left = 1.2 + x + "px";
      ele.style.top = 2 + y + "px";
   }


   move(num) {
      let i = this.position;
      let p = this.allPositions;

      ////// At start point /////////
      if (this.position == 0 && num == 6) {
         this.setPostion(p[1].x, p[1].y)
         this.position = 1;
         onpass_sound.play()
         dice.addEventListener('click', startAtClick)
         return
      }


      ////// After Start point /////////
      let time = setInterval(() => {
         if (i - this.position == num) {
            clearInterval(time)
            this.position += num
            // console.log(gittyCurrentPostion);
            let out = false;
            if (!starPlace.includes(this.position)) {
               out = checkOut(this)
            } else {
               onstar_sound.play()
            }

            if (num !== 6 && !out && this.position !== 57) {
               changeTurn()
            }
            if (this.position === 57) {
               win_sound.play();
            }
            dice.addEventListener('click', startAtClick)

            return
         }
         tik_sound.play()
         i++;
         this.setPostion(p[i].x, p[i].y)
      }, 400)

   }
}


let redEle = document.getElementsByClassName('red')
let r1 = new Red(redEle[0], 38, 40, redPath)
let r2 = new Red(redEle[1], 81, 40, redPath)
let r3 = new Red(redEle[2], 38, 80, redPath)
let r4 = new Red(redEle[3], 81, 80, redPath)
let redGitty = [r1, r2, r3, r4]


let greenEle = document.getElementsByClassName('green')
let g1 = new Red(greenEle[0], 299, 40, greenPath)
let g2 = new Red(greenEle[1], 256, 40, greenPath)
let g3 = new Red(greenEle[2], 299, 80, greenPath)
let g4 = new Red(greenEle[3], 256, 80, greenPath)

let greenGitty = [g1, g2, g3, g4]


let blueEle = document.getElementsByClassName('blue')
let b1 = new Red(blueEle[0], 38, 297, bluePath)
let b2 = new Red(blueEle[1], 81, 297, bluePath)
let b3 = new Red(blueEle[2], 38, 257, bluePath)
let b4 = new Red(blueEle[3], 81, 257, bluePath)

let blueGitty = [b1, b2, b3, b4]


let yellowEle = document.getElementsByClassName('yellow')
let y1 = new Red(yellowEle[0], 299, 297, yellowPath)
let y2 = new Red(yellowEle[1], 256, 297, yellowPath)
let y3 = new Red(yellowEle[2], 299, 257, yellowPath)
let y4 = new Red(yellowEle[3], 256, 257, yellowPath)

let yellowGitty = [y1, y2, y3, y4]

let currentGittyPlay = []
let turn = 0
let players = 2
let turnFlow = [redGitty, yellowGitty]
let activeGitty = turnFlow[turn];

//////// When click ////////
function handleTouch(e) {
   let clientX = e.touches[0].clientX;
   let clientY = e.touches[0].clientY;

   for (var i = 0; i < activeGitty.length; i++) {
      let gitty = activeGitty[i];
      gitty.setActive(num)

      let gittyPos = gitty.getPosition()

      let p = gittyPos[gitty.position];

      // console.log(i, gitty.isActive, between(clientX, p.x, 10, 30) && between(clientY, p.y, 8, 25))

      if (gitty.isActive && between(clientX, p.x, 10, 30) && between(clientY, p.y, 8, 25)) {
         removeAnimation(activeGitty)

         gitty.move(num)


         num = 0
         break
      }

   }
}

function changeTurn() {
   activeGitty = turnFlow[(++turn) % players]
}

function removeAnimation(elements) {
   for (item of elements) {
      if (item.red.classList.contains('animate')) {
         item.red.classList.remove('animate')
      }
   }
}

function checkOut(gitty) {
   for (let i in turnFlow) {
      let colorGitty = turnFlow[i]
      // console.log(colorGitty[0].color);
      if (colorGitty[0].color !== gitty.color) {
         for (let otherGitty of colorGitty) {
            let ogcp = otherGitty.getCurrentPosition()
            let gcp = gitty.getCurrentPosition()
            if (ogcp.x === gcp.x && ogcp.y === gcp.y) {
               otherGitty.setPostion(otherGitty.x, otherGitty.y)
               otherGitty.position = 0
               out_sound.play()
               return true
            }
         }
      }
   }
   return false


}

function between(a, b, n, m) {
   return a > b - n && a < b + m
}

////// dice rolling /////

let dice = document.getElementById('dice')
dice.addEventListener('click', startAtClick)

let out = document.getElementById('out')

let num;

socket.on("get_num",n=>{
    num = n;
    start()
    
})
socket.io.on("reconnect", () => {
  console.log("reconnecting……")
});

function startAtClick(){
    num = getRandomInt(1, 6)
    socket.emit("roll",num)
    start()
}

function start() {
   
   out.innerHTML = num
   let inactiveCount = 0;
   let countWin = 0;
   let activeGitty;
   for (let g of turnFlow[(turn) % players]) {
      g.setActive(num)
      if (!g.isActive) {
         inactiveCount++;
      } else {
         activeGitty = g;
         g.red.classList.add('animate')
      }
      if (g.position === 57) {
         countWin++;
      }
   }

   if (countWin === 4) {
      turnFlow.slice(turn % players, turn % players + 1)
      players--;

   }

   if (inactiveCount === 4) {
      changeTurn()
      document.getElementById('main').removeEventListener('touchstart', handleTouch)
   }
   else if (inactiveCount === 3) {
      document.getElementById('main').removeEventListener('touchstart', handleTouch)
      activeGitty.red.classList.remove('animate')
      activeGitty.move(num)
      dice.removeEventListener('click', startAtClick)
   }
   else {
      document.getElementById('main').addEventListener('touchstart', handleTouch)
      dice.removeEventListener('click', startAtClick)
   }

}



function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
