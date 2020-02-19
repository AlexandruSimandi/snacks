const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRe6Kk-BwS31KiUKGHTu-0M3Yrnb0CT8uUD62ocf5rF2N4tgJY8TRKqT22G1Fw8gWXlrDKw8POk1DK9/pub?gid=1270485783&single=true&output=csv"

function openStuff() {
    axios.request({
        method: "get",
        url: sheetUrl,
        crossdomain: true
      })
      .then(function (response) {
        document.getElementById("content").innerHTML=""

        const lines = response.data.split('\n')
        table = lines.map(line => line.split(','))
    
        table.shift()
        table.shift()
    
        table.forEach(row => {
            const offsetItem = parseInt(row[6])
            if(offsetItem < 0) {
                window.open(row[3], '_blank')
                                
                tr = document.createElement("tr");

                tdItem = document.createElement("td");
                tdItemText = document.createTextNode(row[1]);
                tdItem.appendChild(tdItemText);
                tr.appendChild(tdItem);

                tdCount = document.createElement("td");
                tdCountText = document.createTextNode(Math.abs(row[6]));
                tdCount.appendChild(tdCountText);
                tr.appendChild(tdCount);

                const tableBody = document.getElementById("content")
                tableBody.appendChild(tr);
            }
        })
      })
      .catch(function (error) {
        console.log(error);
      })    
}