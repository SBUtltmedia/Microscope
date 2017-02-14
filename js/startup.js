/* * startup.js
 * Source provides user with UI to choose start up options.
 * Startup options include the choice between three game modes.
 *
 **/


function loadStartMenu() {
    $("#endText").text("Microscope Simulator");
    $("#endSubText").text("By the end of the simulation, \nyou will know how to use a microscope.");
    $("#endSubText").css({
        opacity: 1
    });
    $(".endErrorText").css({
        opacity: 0
    });
    showMenu();
}

function loadIntroComplete() {

    $("#endText").text("Great job!");
    $("#endSubText").text("The next phase will teach you how to\n set up the microscope.\n If you forget what each part does, you can go back.")
        $("#endSubText").css({
            opacity: 1
        });
    $(".endErrorText").css({
        opacity: 0
    });
    showMenu();
}


function loadGameComplete() {
    $("#endText").text("Great job!");
    $("#endSubText").text("You finished the game mode.")
        $("#endSubText").css({
            opacity: 1
        });
    $(".endErrorText").css({
        opacity: 0
    });
    showMenu();
}

function showMenu() {
    // Make overlay visible
    $("#overlay").css({
        'opacity': 1,
    'z-index': 100
    });
    // Lock/unlock modes
    lockModes();
    // Show results screen
    $("#results").removeClass("anim_exitResults");
    $("#results").addClass("anim_enterResults");
    $("#overlayBG").removeClass("anim_fadeOutBG");
    $("#overlayBG").addClass("anim_fadeInBG");
}


function hideMenu() {
    // Make overlay invisible after it fades out
    setTimeout(function () {
        $("#overlay").css({
            'opacity': 0,
        'z-index': -100
        });
    }, 500);
    // Hide results screen
    $("#results").removeClass("anim_enterResults");
    $("#results").addClass("anim_exitResults");
    $("#overlayBG").removeClass("anim_fadeInBG");
    $("#overlayBG").addClass("anim_fadeOutBG");
}


function lockModes() {
    // Intermediate mode: lock if Beginner not yet completed
    if (true) {
        // Unlock
        $("#endOptionDescText2").html("• No hints <br> • 5 dial readings <br> • You lose if you make a mistake.");
        $("#endOption2").removeClass("endOptionLocked");
        $("#endOption2").addClass("endOptionUnlocked");
    } else {
        // Lock
        $("#endOptionDescText2").html("Locked! <br> Complete Beginner mode to unlock.");
        $("#endOption2").removeClass("endOptionUnlocked");
        $("#endOption2").addClass("endOptionLocked");
    }
    // Expert mode: lock if Intermediate not yet completed
    if (true) {
        // Unlock
        $("#endOptionDescText3").html("• No hints, more controls <br> • 7 dial readings <br> • You lose if you make a mistake.");
        $("#endOption3").removeClass("endOptionLocked");
        $("#endOption3").addClass("endOptionUnlocked");
    } else {
        // Lock
        $("#endOptionDescText3").html("Locked! <br> Complete Intermediate mode to unlock.");
        $("#endOption3").removeClass("endOptionUnlocked");
        $("#endOption3").addClass("endOptionLocked");
    }
}


function newGame(guided, manual) {
    hideMenu(); // Hide menu
    updateSteps(); // Update steps

    // Animate in step objects
    enterStepObjects();

    // Record start time
    //testGame();

    resizeWindow(); // Resize window
}


function loadIntro(){
    var stepText = [{
        "id": "intro",
        "shortText": "Introduction",
        "steps": [{
            "id": "introLightSwitch",
            "shortText": "Light Switch",
            "longText": "Hover over the highlighted components to learn more about the parts of the microscope.",
            "feedbackText": "click the light switch"
        }]
    }]
    
    game = new Game(true, true);
    var stepCount = -1;
    var groupCount = -1;
    for (i in stepText) {
        groupCount++;
        var newGroup = new StepGroup(stepText[i].id, stepText[i].shortText, "#group" + groupCount, "#groupIcon" + groupCount);
        game.addGroup(newGroup);
        for (j in stepText[i].steps) {
            var cur = stepText[i].steps[j];
            stepCount++;
            var newStep = new Step(cur.id, cur.shortText, cur.longText, cur.feedback, "#step" + stepCount, "#icon" + stepCount);
            game.addStep(newStep);
            newGroup.addStep(newStep);
        }
    }
    game.linkSteps();


    /** Introduction **/
    introLightSwitch = game.getGroupStep(0, 0);
    updateSteps();
    introLightSwitch.activate();
}


function loadTutorial() {
    //  Define steps (order doesn't matter here)
    var stepText = [{
        "id": "setup",
        "shortText": "Setup",
        "steps": [{
            "id": "setupLightSwitch",
            "shortText": "Light Switch",
            "longText": "Click the light switch.",
            "feedbackText": "click the light switch"
        }, {
            "id": "setupSlide",
            "shortText": "Slide",
            "longText": "Push in the slide.",
            "feedbackText": "click the light switch"
        }, {
            "id": "setupCondenser",
            "shortText": "Condenser",
            "longText": "Move the aperture knob slightly to the left.",
            "feedbackText": "Move the condensor knob."

        }, {
            "id": "setupCaliper",
            "shortText": "Caliper Knob",
            "longText": "Adjust the caliper knobs.",
            "feedbackText": "Move the caliper knob."

        }]
    },

        {
            "id": "lowMag",
            "shortText": "Low Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }, {
                "id": "setupDiaphragmLight",
                "shortText": "Diaphragm Light",
                "longText": "Click the diaphragm.",
                "feedbackText": "click the diaphragm"
            },{
                "id": "setupCoarse",
                "shortText": "Coarse Knob",
                "longText": "Click the coarse knobs.",
                "feedbackText": "click the coarse knobs"
            } ]  
        }, {
            "id": "medMag",
            "shortText": "Medium Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            },{
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            },{ 
                "id": "setupDiopter",
                "shortText": "Diopter",
                "longText": "Adjust the diopter (left ocular)",
                "feedbackText": "click the eyepiece"
            },{ 
                "id": "setupEyepiece",
                "shortText": "Eyepiece",
                "longText": "Click the eyepiece.",
                "feedbackText": "click the eyepiece"
            }]

        }, {
            "id": "highMag",
            "shortText": "High Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            },{ 
                "id": "setupAperture",
                "shortText": "Highest Aperture",
                "longText": "Adjust the diopter (left ocular)",
                "feedbackText": "click the eyepiece"
            },{
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            }]
        }
    ];

    game = new Game(true, true);
    var stepCount = -1;
    var groupCount = -1;
    for (i in stepText) {
        groupCount++;
        var newGroup = new StepGroup(stepText[i].id, stepText[i].shortText, "#group" + groupCount, "#groupIcon" + groupCount);
        game.addGroup(newGroup);
        for (j in stepText[i].steps) {
            var cur = stepText[i].steps[j];
            stepCount++;
            var newStep = new Step(cur.id, cur.shortText, cur.longText, cur.feedback, "#step" + stepCount, "#icon" + stepCount);
            game.addStep(newStep);
            newGroup.addStep(newStep);
        }
    }
    game.linkSteps();


    /** Tutorial **/
    setupLightSwitch = game.getGroupStep(0, 0);
    setupSlide = game.getGroupStep(0, 1);
    setupCondense = game.getGroupStep(0, 2);
    setupCaliper = game.getGroupStep(0, 3);
    // Low Magnification
    lowLenses = game.getGroupStep(1,0);
    lowDiaphragmLight = game.getGroupStep(1, 1);
    lowCoarse = game.getGroupStep(1, 2);

    // Med Magnification
    medLenses = game.getGroupStep(2,0)
        medFine = game.getGroupStep(2, 1);
    medDiopter = game.getGroupStep(2, 2);
    medOcular = game.getGroupStep(2, 3);


    // High magnification
    highLenses = game.getGroupStep(3,0)
        highAperture = game.getGroupStep(3, 1);
    highFine = game.getGroupStep(3, 2);

    updateSteps();
    setupLightSwitch.activate();
}


function initEndOptionHover(id) {
    $("#endOption" + id).hover(function () {
        // Mouse over cell
        $("#endOptionDesc" + id).removeClass("anim_exitEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_enterEndOptionDesc");

    }, function () {
        // Leave cell
        $("#endOptionDesc" + id).removeClass("anim_enterEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_exitEndOptionDesc");
    });
}

//-1 - no image 0 - first occurence, 1 - low, 2 - med, 3 - high
function swapMag(n){
    var path = 'img/cells/';
    var cell = "";
    var cell2 = "";
    var slideImg = ""
        var slideImg2 = ""
        if (n==0){
            slideImg = $('<img id="slideContents">');
            slideImg2 = $('<img id="slideContents2">');
            slideImg.appendTo('#slideView');
            slideImg2.appendTo('#slideView2');
            return;
        }
    slideImg = $("#slideContents");
    slideImg2 = $("#slideContents2");
    if (n==1){
        cell = path + 'eyepieceCellsLow-bg.png';
    }
    else if (n==2 || n==3){
        cell = path + 'eyepieceCellsHigh.png';
        cell2 = path + 'eyepieceCellsHigh.png';
    }
    //var eUpsidedown = path + 'e.png';

    slideImg.attr('src', cell);
    slideImg2.attr('src', cell2);
}


var formerState = $("body").html();

// Unloads everything, used to change game modes
function destroy(){
    console.log(game);
    $("#steps").html(""); 


    $("#microscope").html("");
    $("rotate").html("");
    $("body").html(formerState);
}


// ====== Frame setup and microscope initialization. ====== //
function startup(fun){
    $("#rotate").load('img/sideview.svg', function () {
        $("#draggableDiaphragm").addClass("knob");
    })

    // image paths
    var microscope = 'img/microscope.svg';

    $('#microscope').load(microscope, function () {
        updateAnimation();

        //$('#microscope svg').append('<filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="1" /></filter>')
        swapMag(0);
        resizeWindow();
        loadStartMenu();
        fun();
        //loadTutorial();

        $("#endOption1").click(function () {
            // Start Beginner Mode
            newGame(true, false);
        });
        resizeWindow();
    });

}


var currentMode = "Introduction"
//Encapsulation
$(function(){
    // Attach event listeners to buttons on header
    $("#header button").click(function(event){
        $("#header button").each(function(index){
            $(this).removeClass("headerButtonActive"); 
        });
        var id = $(this).toggleClass("headerButtonActive");
        var innerText = $(this).text();
        currentMode = innerText;
        switch(innerText){
            case "Introduction":
                destroy();
                startup(loadIntro);
                break;
            case "Tutorial":
                destroy();
                startup(loadTutorial);
                break;
        } 
    });

    startup(loadIntro);
});
