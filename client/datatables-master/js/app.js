/**
 * Created by beraaksoy on 2/6/17.
 */
$(document).ready(function () {

    const mockData = {
      "posts": [
          {
              "_id": "64774337b9cfb9ae60bba5a9",
              "name": "sam",
              "totalmarks": 20,
              "age": 12,
              "updated": "2023-05-31T12:53:11.586Z",
              "__v": 0
          },
          {
              "_id": "64774337b9cfb9ae60bba5a9",
              "name": "sam",
              "totalmarks": 25,
              "age": 12,
              "updated": "2023-05-31T12:53:11.586Z",
              "__v": 0
          },
          {
              "_id": "64774337b9cfb9ae60bba5a9",
              "name": "sam",
              "totalmarks": 30,
              "age": 12,
              "updated": "2023-05-31T12:53:11.586Z",
              "__v": 0
          }
      ],
      "totalPages": 1,
      "currentPage": "1"
    }

    function createTable() {
      const table = $('#maintable').DataTable({
          mark: true,
          dom: 'Bfrtip',
          lengthMenu: [
              [10, 25, 50, 100, -1],
              ['10 rows', '25 rows', '50 rows', '100 rows', 'Show All']
          ],
          buttons: [
              'pageLength',
              {
                  extend: 'copyHtml5',
                  exportOptions: {
                      columns: ':visible'
                  }
              },
              {
                  extend: 'excelHtml5',
                  exportOptions: {
                      columns: ':visible'
                  }
              },
              {
                  extend: 'csvHtml5',
                  exportOptions: {
                      columns: ':visible'
                  }
              },
              {
                  extend: 'print',
                  exportOptions: {
                      columns: ':visible'
                  }
              },
              {
                  extend: 'pdfHtml5',
                  download: 'open',
                  exportOptions: {
                      columns: ':visible'
                  }
              },
              'colvis'
          ],
          columDefs: [{
              targets: -1,
              visible: false
          }]
      });

      table.columns().eq(0).each(function (colIdx) {
          $('input', table.column(colIdx).footer()).on('keyup change', function () {
              table
                  .column(colIdx)
                  .search(this.value)
                  .draw();
          });
      });

      $('#maintable tfoot th').each(function () {
          var title = $('#maintable tfoot th').eq($(this).index()).text();
          $(this).html('<input type="text" placeholder="Search ' + title + '" />');
      });

      return table;
    }

    // API URL
    var apiUrl = 'http:localhost:5000/studenDetails?page=1&limit=2';
    var postsTable = createTable();
    // loads data
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
      processData(postsTable, data);
    }).catch(err => {
      processData(postsTable, mockData);
    });

    function processData(table, data) {
      data.posts.forEach((post) => {
        table.row.add([1, post.name, post.totalmarks, post.age]).draw(false);
      })
    }

});
