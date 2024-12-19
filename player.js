export class Player {
    constructor(name, timeLeftMs) {
        this.name = name;
        this.timeLeft = timeLeftMs;
        this.lastTimeLeftUpdate = null;
    }

    activeTimeLeft() {
        this.lastTimeLeftUpdate = new Date();
    }

    getPlayerTimeLeft() {
        return this.timeLeft;
    }

    updatePlayerTimeLeft(deltaTime) {
        const currentTime = new Date();
        const elapsedTime = currentTime - this.lastTimeLeftUpdate
        // Update the player's time left
        this.timeLeft = Math.max(0, this.timeLeft - elapsedTime)
        // update the last update time
        this.lastTimeLeftUpdate = currentTime;
    }

    resetTime(timeLeftMs){
        this.timeLeft = timeLeftMs;
        this.lastTimeLeftUpdate = null;
    }
}