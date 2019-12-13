
var app = new Vue({
    el: "#app",
    data: {
        page1: true, //true if on home page
        page2: false, //true if on character page
        transition: false, //whether a transition is needed or not
    },
    data() {
        return {
            data: null,
            page1: true, //true if on home page
            page2: false, //true if on character page
            transition: false, //whether a transition is needed or not
            characterId: "",
            yeet: "",
            moveUp: false,
            moveDown: false,
            moveSide: false,
            moveNeutral: false,
        }
    },
    methods: {
        goToCharacterPage: function() {
            this.page1 = false;
            this.page2 = true;
            this.transition = true;
            console.log(this.characterId.toString());
            
            this.yeet = this.characterId.toString();
            console.log(this.yeet);
        },
        goHome: function() {
            this.page1 = true;
            this.page2 = false;
            window.setTimeout(()=>{this.transition = false}, 1000);
            this.transition = true;
        }, 
        select: function(event) {
            this.characterId = event.currentTarget.id;
            //console.log(characterId);
            window.setTimeout(()=>{this.transition = false}, 1000);
            this.goToCharacterPage();
        },
        select2: function(event, name){
            console.log(name.toString())
        	this.characterId = name.toString();
            //console.log(characterId);
            window.setTimeout(()=>{this.transition = false}, 1000);
            this.goToCharacterPage();
        },
        displayMoveset: function() {
            this.moveDetails = true;
            console.log("mouseover");
            
        },
        displayUp: function() {
            this.moveUp = true;           
        },
        hideUp: function() {
            this.moveUp = false;
        },
        displaySide: function() {
            this.moveSide= true;           
        },
        hideSide: function() {
            this.moveSide = false;
        },
        displayDown: function() {
            this.moveDown = true;           
        },
        hideDown: function() {
            this.moveDown = false;
        },
        displayNeutral: function() {
            this.moveNeutral= true;           
        },
        hideNeutral: function() {
            this.moveNeutral = false;
        },
        
        
    },
    mounted() {
        axios
        .get('data/smash.json')
        .then(response => (this.data = response.data))
    }
})