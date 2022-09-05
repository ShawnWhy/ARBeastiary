/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isblock = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isblock = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isblock = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      // this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("onefingermove", this.switchCreature);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  creatureThrottle : "off",
  
  switchCreature: function(event){

   

    // console.log("switchcreature");
    // console.log($("#creature"));  

if(this.creatureThrottle ==="off"){
  console.log(creatureType);
    switch(creatureType){
      case "whale": creatureType = "bird";
      $("#creature").attr("position",".3 1 0" )
      $(".name").css("display", "none")
      $(".commonname").css("display", "none")
      $(".habitat").css("display", "none")
      $(".additional").css("display", "none")  
      setTimeout(() => {
        $("#creature").attr("position","0 1 0" )
        $(".name").css("display", "block")
        $(".commonname").css("display", "block")
        $(".habitat").css("display", "block")
        $(".additional").css("display", "block")
        $("#creature").attr("gltf-model", "./assets/bird.glb")
        $("#creature").attr("position","0 1 0" )
        $(".name").html(creatureInformation.bird.name)
        $(".commonname").html(creatureInformation.bird.commonName)
        $(".habitat").html(creatureInformation.bird.habitat)
        $(".additional").html(creatureInformation.bird.additional)

      }, 100);
      
      this.creatureThrottle = "on"
      break;

      case "bird": creatureType = "bull";
      $("#creature").attr("position",".3 1 0" )
      $("#creature").attr("position",".3 1 0" )
      $(".name").html("display", "none")
      $(".commonname").css("display", "none")
      $(".habitat").css("display", "none")
      $(".additional").css("display", "none")        
   
      setTimeout(() => {
        $("#creature").attr("gltf-model", "./assets/bull.glb")
        $("#creature").attr("rotation","0 180 0" )

        $("#creature").attr("position","0 1 0" )
        $("#creature").attr("position","0 1 0" )
        $(".name").css("display", "block")
        $(".commonname").css("display", "block")
        $(".habitat").css("display", "block")
        $(".additional").css("display", "block")
        $(".name").html(creatureInformation.bull.name)
        $(".commonname").html(creatureInformation.bull.commonName)
        $(".habitat").html(creatureInformation.bull.habitat)
        $(".additional").html(creatureInformation.bull.additional)

      }, 100);
      this.creatureThrottle = "on"
      break;

      case "bull": creatureType = "whale";
      $("#creature").attr("position",".3 1 0" )
      $(".name").html("display", "none")
      $(".commonname").css("display", "none")
      $(".habitat").css("display", "none")
      $(".additional").css("display", "none")        
   
      setTimeout(() => {
        $("#creature").attr("gltf-model", "./assets/whale.glb")
        $("#creature").attr("rotation","0 0 0" )

        $("#creature").attr("position","0 1 0" )
        $(".name").html("display", "block")
        $(".commonname").css("display", "block")
        $(".habitat").css("display", "block")
        $(".additional").css("display", "block")


        $(".name").html(creatureInformation.whale.name)
        $(".commonname").html(creatureInformation.whale.commonName)
        $(".habitat").html(creatureInformation.whale.habitat)
        $(".additional").html(creatureInformation.whale.additional)
      }, 100);
      this.creatureThrottle = "on" 
      
     }

    }
   

    setTimeout(() => {
      this.creatureThrottle = "off"
    }, 500);
  },

  handleRotation: function (event) {
    if (this.isblock) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
    }
  },

  handleScale: function (event) {
    if (this.isblock) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },
});
