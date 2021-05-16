var app = new Vue({
    el: '#root',
    data: {
        campo: [],
        totBombs: 9,
        totCols: 10,
        totRows: 10,
        score: 0,
        gameEnded: false,
        endMessage: 'hai perso!',
        username: '',
        ranks: [
            ['aldo', 1],
            ['chapo', 27],
            ['calavera', 4]
        ],
        squares: {
            0: "zero"
        }
    },
    methods: {
        sweep(mineArrs, cols, rows) {
            let field = Array.from({ length: rows }, i => i = Array.from({ length: cols }, j => j = 0));
            for (item of mineArrs) {
                setMines(item)
            }
            for (item of mineArrs) {
                field[item[0]][item[1]] = "bomb";
            }
            this.campo = field;

            function setMines(coord) {
                for (row of ranger(coord[0])) {
                    for (col of ranger(coord[1])) {
                        if (field[row] && field[col]) {
                            //questo funzia solo in js, fondamentalmente, poi magari cambia
                            field[row][col] += 1;
                        }
                    }
                }
            }
            function ranger(n) { return [n - 1, n, n + 1] }
        },

        unabomber(tot, cols, rows) {
            let c = 0;
            let b = [];
            while (c < tot) {
                newBombX = this.getRandomInt(0, rows);
                newBombY = this.getRandomInt(0, cols);
                if (!b.some(bomb => bomb[0] == newBombX & bomb[1] == newBombY)) {
                    b.push([newBombX, newBombY]);
                    c++;
                }
            }
            return b
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
        },
        uncover(event) {
            if (event.target.classList.contains('bomb')) {
                document.getElementById('explode').classList.remove('nada');
                setTimeout(() => {
                    // endGame(resultMessage = 'hai perso!');
                    this.gameEnded = true;
                    alert(this.endMessage);
                    this.ranks.push([prompt('username') || `player_${this.getRandomInt(1, 100)}`, this.score]);
                    this.ranks.sort((a,b) => b[1] - a[1]);
                    document.getElementById('explode').classList.add('nada');

                }, 1500)

            }
            event.target.classList.remove('hidden');
            this.score++;
        },
        reset() {
            this.gameEnded = false;
            this.score = 0;
            this.sweep(this.unabomber(this.totBombs, this.totCols, this.totRows), this.totCols, this.totRows)
        }
    },
    created() {
        this.sweep(this.unabomber(this.totBombs, this.totCols, this.totRows), this.totCols, this.totRows)
    },
    computed: {

    }
})
