var app = new Vue({
    el: "#app", 
    mounted: function() {
        axios.get('data/albums.json').then(response => {
            this.albums = response.data.albums;
        });
    },
    data:{
        albums: [ ]
    }, 
    methods: {

    }
})