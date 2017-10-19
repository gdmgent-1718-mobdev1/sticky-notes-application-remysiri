function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() { //dom manipulatie
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.testApplicationDbContext(); // Test DbContext

        
               
             var stickyNotes = this._applicationDbContext.getStickyNotes();
             var resultsElement = document.querySelector('.stickynotes');

            stickyNotes.forEach(function (element) {
                resultsElement.innerHTML +=
                    `
                        <div class="stickyNoteResult">
                            <div class="stickyNoteContent">
                                <span class="text"> ${element.message} </br></span>

                                <form>
                                    <button class="btn deleteNote" id="${element.id}">Verwijderen</button> 
                                    <button class=" btn updateNote" id="${element.id}" data="${element.message}">Update</button>
                                </form>
                            </div>
                        </div>
                    
                `;
                }, this);

            
       // AddStickyNote
            
            document.getElementById("add-sticky").addEventListener("click", createStickyNote);
            
            function createStickyNote() {
                var value = document.getElementById("stickynote-message").value;
               
                    var newNote = new StickyNote();
                    newNote.message = value;
                    ApplicationDbContext.addStickyNote(newNote);
                

            }

        // DeleteStickyNote 
            
            var deleteNote = document.querySelectorAll('.deleteNote');
            for (var i = 0; i < deleteNote.length; i++) {
                deleteNote[i].addEventListener('click', function (event) {
                    
                    var id = parseInt(this.id);
                    ApplicationDbContext.deleteStickyNoteById(id);
                });
            }

        // UpdateStickyNoteById
           
            var updateNote = document.querySelectorAll('.updateNote');
            for (var i = 0; i < updateNote.length; i++) {
                updateNote[i].addEventListener('click', function (event) {
                    
                         var message = prompt("", "Vul nieuwe tekst in");
                    
                        var id = parseInt(this.id);
                        sn = ApplicationDbContext.getStickyNoteById(id);
                        sn.message = message;
                        ApplicationDbContext.updateStickyNote(sn);
                    
                });
            }

        /*clearStickyNotes werkt nog niet
            var clearAll = document.querySelectorAll('clear');
        document.getElementsByClassName("clear").addEventListener("click", clearAll);
        ApplicationDbContext.clearAll();*/


        
        

           
            
        },
    };

    App.init(); // Initialize the application
});
