d3.json("./samples.json").then(function(data) {
    console.log(data);

    var sample = Object.values(data.samples);
    console.log(sample);
    var metadata = Object.values(data.metadata);
    console.log(metadata[0]);
    var meta_en = d3.entries(metadata[0]);
    console.log(meta_en[6].value);

    var selector = d3.select("#selDataset")
      .selectAll("option")
      .data(sample)
      .enter().append("option")
      .text(function(d){
             return d.id})
      .attr("value", function(d,i){
             return i});
            
    d3.select("#selDataset").on("change", function(d){getData();});

    
    function init(){
        var sample_val = Object.values(sample[0].sample_values);
        var sample_id = Object.values(sample[0].otu_ids);
        var sample_lbl = Object.values(sample[0].otu_labels);
        var y_val = [];
        sample_id.forEach(id => {
            id = "OTU" + " " + id
            y_val.push(id)
        })
        var data = [{ 
          x: sample_val.slice(0,10).reverse(),
          y: y_val,
          type: 'bar',
          orientation: 'h',
          hovertext: sample_lbl.slice(0,10).reverse(),
                  
        }];
        var data2 = [{
          x: sample_id,
          y: sample_val,
          mode: 'markers',
          marker:{
            size:sample_val,
            color:sample_id
          },
          hovertext: sample_lbl
        }];
        var data3 = [
          {
            domain: {
               x: [0, 1],
               y: [0, 1] 
              },
            value: meta_en[6].value,
            title: { text: "Scrubs per week" },
            type: "indicator",
            mode: "gauge+number",
            gauge:{
              axis:{ 
                range: [null,10],
                tickmode: 'array',
                tickvals: [1,2,3,4,5,6,7,8,9,10],
                ticktext: [1,2,3,4,5,6,7,8,9,10]
              }
            }
        }];
        
        Plotly.newPlot("bar", data);
        Plotly.newPlot("bubble",data2);
        Plotly.newPlot('gauge', data3);

        d3.select("#sample-metadata")
          .selectAll("ul")
          .data(meta_en)
          .enter().append("li")
          .text(function(d,i){
            return `${d.key}: ${d.value}`;
          });

      }
    init(); 
    
    function getData(){
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      console.log(dataset);
      var id = sample.map(x => x.id);
      console.log(id);
      var sample_val = Object.values(sample[dataset].sample_values);
      console.log(sample_val);
      var sample_id = Object.values(sample[dataset].otu_ids);
      var sampleid_top= sample_id.slice(0,10).reverse().map(String);
      var y_val = [];
      sampleid_top.forEach(id => {
        id = "OTU" + " " + id
        y_val.push(id)
      })
      console.log(sample_id);
      var sample_lbl = Object.values(sample[dataset].otu_labels);
      console.log(sample_lbl);
      var meta_entries = d3.entries(metadata[dataset]);
    
      var data = [{ 
          x: sample_val.slice(0,10).reverse(),
          y: y_val,
          type: 'bar',
          orientation: 'h',
          hovertext: sample_lbl.slice(0,10).reverse()
          
      }];
      var data2 = [{
          x: sample_id,
          y: sample_val,
          mode: 'markers',
          marker:{
            size:sample_val,
            color:sample_id
          },
          hovertext: sample_lbl
      }];
      var data3 = [
        {
          domain: {
             x: [0, 1],
             y: [0, 1] 
            },
          value: meta_entries[6].value,
          title: { text: "Scrubs per week" },
          type: "indicator",
          mode: "gauge+number",
          gauge:{
            axis:{ 
                   range: [null,10],
                   tickmode: 'array',
                   tickvals: [1,2,3,4,5,6,7,8,9,10],
                   ticktext: [1,2,3,4,5,6,7,8,9,10]
            },

          },
          text:["1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
          hoverinfo:'label',
          marker:{size:28, color:'850000'}
      }];  
        
      Plotly.newPlot("bar", data);
      Plotly.newPlot("bubble",data2);
      Plotly.newPlot('gauge', data3);

      let table = d3.select("#sample-metadata");
      table.html("");
      
      d3.select("#sample-metadata")
          .selectAll("ul")
          .data(meta_entries)
          .enter().append("li")
          .text(function(d,i){
            return `${d.key}: ${d.value}`;
          });
    
    }
});


