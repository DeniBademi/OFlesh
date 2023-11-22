import { Component, OnInit } from '@angular/core';
import { loadFull } from 'tsparticles';
import { Container, Engine, InteractivityDetect, MoveDirection, OutMode } from 'tsparticles-engine';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {
  id = "tsparticles";
  constructor() { }

  ngOnInit() {
  }
  options = {
    "particles": {
      "number": {
        "value": 58,
        "density": {
          "enable": true,
          "value_area": 962.0472365193136
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "image",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "https://res.cloudinary.com/dvkjlgu83/image/upload/v1677170302/hexagon_wrca59.png",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 76.16207289111233,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.8,
        "direction": MoveDirection.top,
        "random": true,
        "straight": true,
        "out_mode": OutMode.out,
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": InteractivityDetect.canvas,
      "events": {
        "onhover": {
          "enable": false,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 255.80432187492372,
          "size": 48.72463273808071,
          "duration": 3.8979706190464563,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    fullScreen: {
      enable: false,
      zIndex: -10 // or any value is good for you, if you use -1 set `interactivity.detectsOn` to `"window"` if you need mouse interactions
    },
  };
  
  particlesLoaded(container: Container): void {
    //console.log(container);
}

async particlesInit(engine: Engine): Promise<void> {
    //console.log(engine);
    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}
}
