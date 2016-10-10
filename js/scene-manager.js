function introText() {
    $("#headerText").html("-Introduction-");
}


function setupText() {
    $("#headerText").text("Follow the instructions to toggle the components.");
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/*
   Use of below function is for intro.js (intro.js + gameLogic.js interdependence).
 */
function startStep(step) {
    /* intro

       Intro doesn't necessarily have flexible choices for the user to act on.
       The purpose of the introduction is to teach the user about the different
       parts of the microscope.
     */
    if (step == introLightSwitch) {
        introText();
        triggerLightSwitch();
        $("#light").addClass("elementOff");
    }
    if (step == introDiaphragm) {
        triggerDiaphragm();
    }
    if (step == introFine) {
        triggerFine();
    }
    if (step == introCoarse) {
        triggerCoarse();
    }
    if (step == introLenses) {
        triggerLenses();
    }
    if (step == introCaliper) {
        triggerCaliper();
    }
    if (step == introEyepiece) {
        triggerEyepiece();
    }

    /* setup

       Steps now have an intermission period between each step where the user must
       act/adjust the microscope before the game proceeds onto the next step.

     */
    if (step == setupLightSwitch) {
        // Make use of the header by making it a tooltip.
        // When user hovers over a piece, describe what it is. 
        // To improve it, use a mapping that takes a key word and redirects it into a proper tooltip.
        components.forEach(function(component){
            $(component).hover(function(){
                $("#headerText").text((component.replace("#","")).capitalize());
            }); 
        }); 
        


        setupText();
        setupEnableSwitch();
        enableLightSwitch();
    }
    if (step == setupEyepiece) {
        setupAdjustEyepiece();
        enableEyepiece();
    }
    if (step == setupCoarse) {
        setupAdjustCoarse();
        enableCoarseKnob();
    }
    if (step == setupFine) {
        setupAdjustFine();
        toggleFine();
    }
    if (step == setupDiaphragmLight) {
        setupDLight();
        enableDiaphragmLight();
    }
    if (step == setupDiaphragmHeight) {
        setupDHeight();
        toggleDiaphragmHeight();
    }
    if (step == setupCaliper) {
        setupAdjustCaliper();
        enableCaliper(); 
    }
    if (step == setupLenses) {
        //setupAdjustLenses();
        //enableLenses();
    }


    // enable freemode? (user can do whatever they want with the scope)

}

function endStep(step) {}
