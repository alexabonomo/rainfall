



var maxParticles = 500,
      // numParticles = 0,
       particles = [],
       collisionDamper = 0.1;

   var canvas = document.querySelector('canvas');
   var ctx = canvas.getContext('2d');

   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   function particle() {
     var p = this;
     p.id = Date.now();
     p.remove = false;
     p.setParticle = function(){
         p.position = {
             x: 40 + (Math.random() * (canvas.width - 40)),
             y: -10 - (Math.random() * 50),
             z: (Math.random() * 10)
         };
         p.velocity = {
             x: 0,
             y: Math.random()*3 + 15,
         };
         p.alpha = 1;
         p.length = 10;
         p.lineWidth = (1 - ((p.position.z / 12)));
         /*
         p.acceleration = {
             x: 0,
             y: 0.8 * (p.position.z / 10)
         };*/
     };
     p.setParticle();
   }

   function newParticle() {
       var curPart = new particle();
       particles.push(curPart);
   }

   function deleteParticle(id){
     for (var i = 0; i < particles.length; i++) {
       if(particles[i].id === id){
         particles[i].removed = true;
         particles.splice(i,1);
       }
     }
   }

   function deleteAllParticles(){
     for (var i = 0; i < particles.length; i++) {
     particles.splice(i,1);
     }
   }

   function drawParticles() {
     for (var i = 0; i < particles.length; i++) {
           var position = particles[i].position;
            ctx.strokeStyle = 'rgba(0,100,200,0.5' + particles[i].alpha + ')';
          //   ctx.strokeStyle = 'white';
           ctx.lineWidth = particles[i].lineWidth;
           ctx.beginPath();
           ctx.moveTo(position.x, position.y);
           ctx.lineTo(position.x, position.y + particles[i].length);
           ctx.stroke();
       }
   }

   function updateParticles() {
       for (var i = 0; i < particles.length; i++) {

         // Update velocity (Acceleration)
           //particles[i].velocity.x += particles[i].acceleration.x;
           //particles[i].velocity.y += particles[i].acceleration.y;

           // Update position based on velocity
           particles[i].position.x += particles[i].velocity.x;
           particles[i].position.y += particles[i].velocity.y;

           particles[i].length = particles[i].velocity.y * 1.8;


           if(particles[i].position.y > canvas.height) {
             particles[i].removed = true;
           }


         if(particles[i] && particles[i].removed){
           particles.splice(i,1);
         }

       }
   }

  //  function checkFloorCollision(i, nextPy) {
  //      if (nextPy >= canvas.height - (particles[i].position.z * (canvas.height / 15))) {
  //          particles[i].velocity.y *= -1;
  //          particles[i].velocity.y *= collisionDamper;
  //          particles[i].length = 3;
  //          if (particles[i].velocity.y >= -0.2 && particles[i].velocity.y <= 0.2) {
  //              particles[i].setParticle();
  //          }
  //      }
  //  }

  //  function loop() {
  //      clear();
  //      update();
  //      draw();
  //      queue();
  //  }

   function clear() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
   /*
   function filterNonRemovable(p){
     return !p.removeParticle;
   }
   function removeParticle(){
     var filteredParticles = particles.filter(filterNonRemovable);
     if(filteredParticles[filteredParticles.length-1]){
       filteredParticles[filteredParticles.length-1].removeParticle = true;
     }
   };

   function update() {
     var filteredParticles = particles.filter(filterNonRemovable);
       if (filteredParticles.length < particles.length) {
           newParticle();
       }else if(filteredParticles.length > particles.length){
         removeParticle();
       }
       updateParticles();
   }
   */

  //  function draw() {
  //      drawParticles();
  //  }

  //  function queue() {
  //      window.requestAnimationFrame(loop);
  //  }

  //  function startRain(){
  //    var setInt;
  //    setInt = setInterval(function(){
  //      if(numParticles < maxParticles){
  //        numParticles++;
  //      }else{
  //        clearInterval(setInt);
  //      setTimeout(function() {
  //        stopRain();
  //      }, 9000);
  //      }
  //    },20);
  //  }
   //
  //  function stopRain(){
  //    var setInt;
  //    setInt = setInterval(function(){
  //      if(numParticles > 10){
  //        numParticles--;
  //      }else{
  //        clearInterval(setInt);
  //      setTimeout(function() {
  //        startRain();
  //      }, 5000);
  //      }
  //    },50);
  //  }


  function spawnParticles() {
    var spawnsLeft = Math.ceil(maxParticles/30);
    while (spawnsLeft > 0 && particles.length< maxParticles) {
      newParticle();
      spawnsLeft--;
    }
  }


var mySound;
var mySound2;


   window.onload = function() {

     setupTSPS();

     mySound = new Audio('sounds/rain1.wav');
     mySound2 = new Audio('sounds/rain2.mp3');

     mySound.loop = true
     mySound2.loop = true

     mySound.play();
     mySound2.play();

     mySound2.volume = 0;


       setInterval(function(){
         clear();
         drawParticles();
         updateParticles();
         spawnParticles();
       },30)
   }




   // setup global vars

var TSPSConnection;
var numPeople = 0;


 function setupTSPS() {

	TSPSConnection = new TSPS.Connection();


	TSPSConnection.connect();

  console.log('connecting')

	// add listeners
	TSPSConnection.onPersonEntered 	= onPersonEntered;
	TSPSConnection.onPersonMoved	= onPersonMoved;
	TSPSConnection.onPersonUpdated	= onPersonUpdated;
	TSPSConnection.onPersonLeft 	= onPersonLeft;
}


function onPersonEntered( person ){
	// clone template + add it to body
	numPeople ++;
  personCountUpdated();
}

function personCountUpdated(){

if (numPeople < 0) {
  numPeople = 0;
}
var volume = Math.min (numPeople / 5, 1);

console.log('a', volume, numPeople);

if (numPeople < 3) {

  mySound.volume = 0;
  mySound2.volume = volume;

}

else {
  mySound2.volume = 0;
  mySound.volume = volume;
}
maxParticles = 20 + numPeople * 100

mySound.volume = Math.min (numPeople / 5, 1);


  console.log(numPeople, maxParticles);
}

function onPersonUpdated( person ){
}

function onPersonMoved( person ){
}

function onPersonLeft( person ){
	numPeople --;
  personCountUpdated();
}
