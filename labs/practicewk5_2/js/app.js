Vue.component("student-card", {
    props: [ "student", "isactive" ],
    // toggles the true or false of active to make it appear and disappear in terms of styling
    template: "<div class='student' v-bind:class='{ cardActive:isactive, cardOut:!isactive }'>{{ student.name }} <br> Skill: {{ student.skill }} <br> Joy: {{student.joy}} <br> {{ student.image }}</div>"
})

var app = new Vue({
    el: "#app",
    data: {
        // array of students
        students: [
            { name: "Chet McGangbuster", skill: 11, joy: 43, image:"😵"},
            { name: "Jonny Threepeat", skill: 98, joy: 2, image:"👾"},
            { name: "Chad", skill: 999, joy: 999, image:"‍💪😤🤙"}
        ],
        // sets current student for iteration purposes
        currentStudent: { name: "Chet McGangbuster", skill: 11, joy: 43, image:"😵"},
        // sets the id to 0 for going through by id
        curStudentId: 0,
        // by default, makes the card appear
        cardActive: true
    },
    methods: {
        arrowClicked: function() {
            
            this.cardActive = !this.cardActive;

            setTimeout( () => {
                //modifys the skill of the current student
                this.currentStudent.skill ++;

                // runs through each of the students in the array
                this.curStudentId ++;
                

                // restarts the loop if the length is overflowed
                if(this.curStudentId >= this.students.length) {
                    this.curStudentId = 0;
                }

                this.currentStudent = this.students[this.curStudentId];

                //triggers animation
                this.cardActive = !this.cardActive; 
                
            }, 300);
        },

        arrowBack: function() {
            this.cardActive = !this.cardActive
            setTimeout( () => {
                
        
                this.currentStudent.joy--;
                this.curStudentId --;
                if(this.curStudentId < 0){
                    this.curStudentId = 2;
                }

                
                this.currentStudent = this.students[this.curStudentId];
               

                this.cardActive = !this.cardActive;
            }, 300);
        }
    }
})