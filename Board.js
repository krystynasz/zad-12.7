var board = {
    name: 'Tablica Kanban',
    addColumn: function (column) {
        this.element.appendChild(column.element);
        initSortable(column.id); //About this feature we will tell later
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function () {
    var name = prompt('Enter a column name');
   
    var data = {
        name: name
        };
        
        var jsonData = JSON.stringify(data);
        
        fetch(baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
        })
/*        
    var data = new FormData();

    data.append('name', name);

    fetch(baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: data,
    })*/
        .then(function (resp) {
            return resp.json();
        })
        .then(function (resp) {
            var column = new Column(resp.id, name);
            board.addColumn(column);
        });
});

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true,

        onEnd: function (evt) {
            var itemEl = evt.item;  // dragged HTMLElement
            console.log(itemEl);
            var cardDiv = itemEl.getElementsByTagName("div")[0];
            var cardId = cardDiv.getAttribute("id");
            var targetColumn = evt.to;    // target list
            evt.from;  // previous list
            evt.oldIndex;  // element's old index within old parent
            evt.newIndex;  // element's new index within new parent
            console.log(cardDiv);
            console.log(cardId);

           var data = {
            bootcamp_kanban_column_id: targetColumn.id
        };
        
        var jsonData = JSON.stringify(data);
           
            //data.append('bootcamp_kanban_column_id',targetColumn.id);
           // console.log(targetColumn.id);
    
            fetch(baseUrl + '/card/' + cardId, { 
                method: 'PUT', 
                headers: myHeaders, 
                body: jsonData, 
            })
            /*fetch(baseUrl + '/card/' + cardId, { method: 'PUT', headers: myHeaders, body:data })*/
              .then(function(resp) {
                if (resp.ok) {
                    return resp.json();    
                }
                throw new Error('Something went wrong.');
              })
              .then(function(resp) {
                console.log(resp);
              })
              .catch(function(err) {
                console.log(err);
              });
                /*return resp.json();
              })
              .catch(function() {
                  console.log("error")
              });*/
            /*var data = new FormData();
                data.append('name', card.id);
                data.append('bootcamp_kanban_column_id',id);
        
                fetch(baseUrl + '/card/' + card.id, { method: 'PUT', headers: myHeaders, body:data })
                  .then(function(resp) {
                    return resp.json();
                  })
                  .then(function(resp) {
                    console.log(card.id);
                  });*/
        }
    });
}