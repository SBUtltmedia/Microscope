/*
 * startup.js
 * Source provides user with UI to choose start up options. 
 * Startup options include the choice between three game modes.
 *
 **/


        function loadStartMenu() {
        $("#headerText").text("Microscope Simulator");
        $("#endText").text("Welcome back!");
        $("#endSubText").text("Select a game mode to begin.");
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

function loadSubMenu() {
    //  Define steps (order doesn't matter here)
    var stepText = [
    {
        "id": "intro",
            "shortText": "Introduction",
            "steps": [
            {
                "id": "introLightSwitch",
                "shortText": "Light Switch",
                "longText": "Click the light switch.",
                "feedbackText": "click the light switch"
            },
            {
                "id": "introEyepiece",
                "shortText": "Eyepiece",
                "longText": "Click the eyepiece.",
                "feedbackText": "click the eyepiece"
            },
            {
                "id": "introCoarse",
                "shortText": "Coarse Knob",
                "longText": "Click the coarse knobs.",
                "feedbackText": "click the coarse knobs"
            },
            {
                "id": "introFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            },
            {
                "id": "introDiaphragm",
                "shortText": "Diaphragm",
                "longText": "Click the diaphragm.",
                "feedbackText": "click the diaphragm"
            },
            {
                "id": "introCaliper",
                "shortText": "Caliper",
                "longText": "Click the caliper.",
                "feedbackText": "click the caliper"
            },
            {
                "id": "introLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }
        ]
    },
    {
        "id": "setup",
        "shortText": "Setup",
        "steps": [
        {
            "id": "setupLightSwitch",
            "shortText": "Light Switch",
            "longText": "Click the light switch.",
            "feedbackText": "click the light switch"
        },
        {
            "id": "setupEyepiece",
            "shortText": "Eyepiece",
            "longText": "Click the eyepiece.",
            "feedbackText": "click the eyepiece"
        },
        {
            "id": "setupCoarse",
            "shortText": "Coarse Knob",
            "longText": "Click the coarse knobs.",
            "feedbackText": "click the coarse knobs"
        },
        {
            "id": "setupFine",
            "shortText": "Fine Knobs",
            "longText": "Click the fine knobs.",
            "feedbackText": "click the fine knobs"
        },
        {
            "id": "setupDiaphragmLight",
            "shortText": "Diaphragm Light",
            "longText": "Click the diaphragm.",
            "feedbackText": "click the diaphragm"
        },
        {
            "id": "setupDiaphragmHeight",
            "shortText": "Diaphragm Height",
            "longText": "Click the diaphragm.",
            "feedbackText": "click the diaphragm"
        },
        {
            "id": "setupCaliper",
            "shortText": "Caliper",
            "longText": "Click the caliper.",
            "feedbackText": "click the caliper"
        },
        {
            "id": "setupLenses",
            "shortText": "Lenses",
            "longText": "Click the lenses.",
            "feedbackText": "click the lenses"
        }
        ]
    },
    {
        "id": "lowmagnification",
        "shortText": "Low Magnification",
        "steps": [
        {
            "id": "triggerL",
            "shortText": "Space Bar",
            "longText": "Press the space bar.",
            "feedbackText": "press the space bar"
        },
        {
            "id": "pressF2",
            "shortText": "Press F",
            "longText": "Press F to pay respects.",
            "feedbackText": "press the F key"
        }
        ]
    },
    {
        "id": "highmagnification",
        "shortText": "High Magnification",
        "steps": [
        {
            "id": "triggerL",
            "shortText": "Space Bar",
            "longText": "Press the space bar.",
            "feedbackText": "press the space bar"
        },
        {
            "id": "pressF2",
            "shortText": "Press F",
            "longText": "Press F to pay respects.",
            "feedbackText": "press the F key"
        }
        ]
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
    // console.log(game);

    // Intro
    introLightSwitch = game.getGroupStep(0, 0);
    introEyepiece = game.getGroupStep(0, 1);
    introCoarse = game.getGroupStep(0, 2);
    introFine = game.getGroupStep(0, 3);
    introDiaphragm = game.getGroupStep(0, 4);
    introCaliper = game.getGroupStep(0, 5);
    introLenses = game.getGroupStep(0, 6);

    // Setup
    setupLightSwitch = game.getGroupStep(1, 0);
    setupEyepiece = game.getGroupStep(1, 1);
    setupCoarse = game.getGroupStep(1, 2);
    setupFine = game.getGroupStep(1, 3);
    setupDiaphragmLight = game.getGroupStep(1, 4);
    setupDiaphragmHeight = game.getGroupStep(1, 5);
    setupCaliper = game.getGroupStep(1, 6);
    setupLenses = game.getGroupStep(1, 7);


    updateSteps();
    //enterStepObjects();
    // console.log("Starting game");
    // introLightSwitch.activate();
    introLightSwitch.activate();
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
