kaplay({
    background: "#87CEEB"
});

loadSprite("dino", "IMG/dino_game-removebg-preview.png");

setGravity(5000)

scene("lose", (lastTime) => {

    const displayTime = lastTime ? lastTime.toFixed(1) : "0.0";

    add([
        text("Time: " + displayTime),
        pos(24, 24)
    ])

    const startButton = add([
        rect(180, 50, { radius: 8 }),
        pos(center()),
        color(0, 120, 255),
        area(),
        anchor("center"),
    ]);

    startButton.add([
        text("Play", { size: 20 }),
        anchor("center"),
        color(255, 255, 255),
    ]);

    startButton.onClick(() => {
        go("game");

    });

    startButton.onHoverUpdate(() => {
        startButton.color = rgb(0, 160, 255);
        setCursor("pointer");
    });

    startButton.onHoverEnd(() => {
        startButton.color = rgb(0, 120, 255);
        setCursor("default");
    });
});

scene("game", () => {

    let time = 0;

    const timeText = add([
        text("Time: " + time),
        pos(24, 24)
    ])

    onUpdate(() => {
        time += dt();

        timeText.text = "Time: " + time.toFixed(1);
    });

    add([
        rect(2000, 200),
        pos(0, 500),
        color("#5da01a"),
        area(),
        body({ isStatic: true })
    ])

    const player = add([
        sprite("dino"),
        scale(1.5, 1.5),
        pos(100, 400),
        area(),
        body()
    ])

    onKeyDown("space", () => {
        if (player.isGrounded()) {
            player.jump(1500)
        }
    })

    function createRock() {
        return [
            rect(100, 50),
            color(128, 128, 128),
            "rock"
        ];
    }

    function createCactus() {
        return [
            rect(25, 100),
            color(34, 139, 34),
            "cactus"
        ];
    }

    const prefabs = [createRock, createCactus];

    function spawnRandomObstacle() {

        const randomPrefabFunc = choose(prefabs);
        const obstacleComponents = randomPrefabFunc();

        add([
            ...obstacleComponents,
            area(),
            body({ isStatic: true }),
            pos(width(), 500),
            anchor("botleft"),
            move(LEFT, 750),
            "obstacle",
        ]);

        // 4. Repeat with a random delay
        wait(rand(0.5, 1), spawnRandomObstacle);
    }

    spawnRandomObstacle();

    player.onCollide("obstacle", () => {
    SaveScore(time);
    go("lose", time);
});
});



async function SaveScore(finalTime) {
    const url = "https://modernmag.nl/save_score.php";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                player: "",
                score: finalTime.toFixed(1)
            })
        });

        console.log(await response.text());
    } catch (error) {
        console.error(error);
    }
}



// async function SaveScore(finalTime) {
//     console.log("SaveScore called", finalTime);

//     try {
//         const response = await fetch("https://modernmag.nl/save_score.php", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 time: parseFloat(finalTime.toFixed(1))
//             })
//         });

//         console.log("HTTP status:", response.status);
//         console.log("Response:", await response.text());
//     } catch (error) {
//         console.error("Fetch failed:", error);
//     }
// }

go("lose");