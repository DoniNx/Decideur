<script>
	import AnAlternative from "../lib/anAlternative.svelte";
	import AParameter from "../lib/aParameter.svelte";
	import ChartBoard from "../lib/chartBoard.svelte";
    import placeholder from "$lib/images/placeholder.png";


    import { parametersStore, alternativesStore } from "../Store";

    let parameters = [];
    let alternatives = [];
    let chartData = {};
    let result = [];
    let toogleChart = false;
    parametersStore.subscribe(data => parameters = data)
    alternativesStore.subscribe(data => alternatives = data)
    

function calculateScore(event){
       toogleChart = false;
        if (parameters.length < 3) {
            alert("At least 3 parameters required");
            return;
        }
        
        
        let labels = [];
        let datasets =[];
        let data = [];
        datasets = [];
        parameters.forEach((ele)=>{
            labels.push(ele.name)
        });

        alternatives.forEach((ele)=>{
            let sum = 0;
            ele.stats.forEach(stat => {
                data.push(stat.val);
                sum+=stat.val;
            });
           
            result.push({ name: ele.name, score: sum});

            datasets.push({ 
                label: ele.name, 
                data, 
                fill: true,
            });
            data = [];
        })

       
        chartData = { labels, datasets};
        result.sort((a, b) => (a.score > b.score) ? -1 : 1)

       
        setTimeout(() => {
            toogleChart = true;
            
        }, 3000);
     
}   

    


    let newParameter = "new param";
    let newAlternative = "new alternative";

    function addAlternative(){
        if (alternatives.find(alternative => alternative.name === newAlternative) || newAlternative === "") {
    return;
  }
  let newItemStatus = [];
  parameters.forEach((ele, i, arr)=>{
        newItemStatus.push({ title: ele.name, val: 0})
  })

        alternativesStore.update(state =>{
            state.push({
                name: newAlternative,
                stats:newItemStatus,
                score: 0
            })
            return state;
        })
    }

    function addParameter () {
        if (parameters.find(parameter => parameter.name === newParameter) || newParameter === "") {
        return;
  } 
  parametersStore.update(state => {
        state.push({name: newParameter,
        options: [
            {
                title:"best",
                val: 1
            },
        ]
    });
       return state;
        })
        

        alternativesStore.update(state => {
          state.map((ele, i, arr) => {
            ele.stats.push({ title: newParameter, val: 0});
          });
          alternatives = state;
          return state;
        })
    };

    function updateOption(event,paIdx) {
        
        parametersStore.update(state => {
        state.forEach((ele, i , arr)=>{
            if(i === paIdx){
                ele.options[event.detail.i] = { ...ele.options[event.detail.i], title: event.detail.newTitle};
            };
        }); 
       return state;
        })
    }
    function addOption(event, paIdx){
        // ⚠️ can't add twice alert
        // limit the numebr of addable options
        if (parameters[paIdx].options.find(option => option.title === event.detail.title) || event.detail.title === "") {
                return;
        }
            
            parametersStore.update(state =>{
                state[paIdx].options.map((ele)=>{
                    return ele.val++;
                });
                
                state[paIdx].options.push(event.detail);
                return state;
            })
            alternativesStore.update(state =>{
                state.forEach((ele)=>{
                    if(ele.stats[paIdx].val !== 0){
                        ele.stats[paIdx].val +=1; 
                    }
                })
                return state;
            })
    }
    function removeParameter(idx){
        parametersStore.update(state => {
            state.splice(idx, 1);
            return state;
        })
        alternativesStore.update(state => {
            state.forEach(alternative => {
                alternative.stats.splice(idx, 1)
            });
            return state;
        })
    }

    function removeAlternative(idx){
        alternativesStore.update(state => {
            state.splice(idx, 1);
            return state;
        })
    }

    
</script>




<div class="flex flex-row my-2 w-fit px-7">
    <input 
    type="text" 
    bind:value="{newAlternative}" 
    class="my-1 text-xl border border-gray-500 bg-slate-400/40 rounded-md px-4 pt-2 pb-1 focus:outline-none">              
<button
    class="bg-green-500 rounded-md  text-gray-100 px-4 py-2 h-fit mx-2 flex flex-row self-center"
    on:click={addAlternative}>
    Add alternative
</button>
</div>

<div class="flex flex-col border items-center">

    <div class="flex flex-col">
        {#each alternatives as alternative, i (alternative.name)}
            <AnAlternative 
                bind:alternative={alternative}
                on:removeAlternative={()=> removeAlternative(i)}
                />    
        {/each}
    </div>


    <div class="flex flex-row w-[80%] overflow-scroll">
        {#each parameters as parameter, paIdx (parameter.name)}
            <AParameter 
                bind:param="{parameter}" 
                on:updateOption={(event)=>{ updateOption(event, paIdx)}} 
                on:addOption={(event)=>{ addOption(event, paIdx)}}
                on:removeParameter={()=> { removeParameter(paIdx)}}
            />
        {/each}
    </div>
    
    
    
    
    
   
    <div class="flex flex-col my-2">
        <input 
        type="text" 
        bind:value="{newParameter}" 
        class="my-1 text-xl uppercase border border-gray-500 bg-slate-400/40 rounded-md px-2 pt-2 pb-1 focus:outline-none">              
    <button
        class="bg-green-500 rounded-md font-bold text-gray-100 px-4 py-2 flex flex-row justify-center items-center"
        on:click={addParameter}>
        Add parameter
    </button>
    </div>



    <div class="flex flex-row my-2 w-full justify-center">            
    <button
        class="bg-yellow-500 text-black font-bold text-xl rounded-md px-20 py-1.5 h-fit mx-2 flex flex-row self-center animate-bounce active:animate-pulse focus:animate-pulse"
        on:click={() => calculateScore(event)}>
        Décider
    </button>
    </div>

    <div>
        {#if toogleChart}
            <ChartBoard bind:chartData bind:final={result[0]} on:closeChart={() => toogleChart = false} />
        {/if}
    </div>

    


</div>

<style>
    .myBlock{
        width: 500px;
        background-color: rgba(133, 133, 133, 0.274);
        margin: 3em 0;
    }
</style>