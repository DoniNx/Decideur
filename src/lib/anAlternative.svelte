<script>
	import { createEventDispatcher } from "svelte";
    import { parametersStore, alternativesStore } from "../Store";


let parametersData = [];
let alternativesData = [];
const dispatch = createEventDispatcher();
parametersStore.subscribe(data => parametersData = data)
alternativesStore.subscribe(data => alternativesData = data)


// change value of election on database ⚠️ be sure first


 
export let alternative = {};

  

    const changeSelection = (event,i)=>{
        if (event.target.value === 'none') {
            alternative.stats[i].val = 0;
        }
        parametersData[i].options.find(ele =>{
            if(ele.title === event.target.value){
                alternative.stats[i].val = ele.val;
            }
        });
        alternative = alternative;
    }
    function removeAlternative (){
        dispatch('removeAlternative');

    }
</script>

<div class="singleAlternative mx-2 mt-3 shadow-xl border py-2 px-2 rounded-md">
    <div class="flex flex-row">
        <div class="flex flex-row justify-between mr-10">
            <button 
            class=" mr-3 text-lg rounded-sm bg-green-200 focus:outline-none"
            on:click={removeAlternative}
            >❎</button>
            <h3>{alternative.name}</h3>
        </div>
        <div class="flex flex-row">
            {#each parametersData as pa, paId (pa.name) }
            <label for="{pa.name}"><span class="bg-slate-300 text-sm px-2 font-light font-mono rounded-sm p-0.5">{pa.name}</span></label>
            <select name="cars" id="cars" on:change={(event) => {changeSelection(event, paId)}} class="bg-transparent border-b-[1px] border-black rounded-sm mr-5 ml-2 px-1 w-24">
                <option value="none" selected>none</option>
                {#each pa.options as stat, stId (stat.title)}
                  <option value="{stat.title}"  >{stat.title}</option>
                {/each}
              </select>
            {/each}
        </div>
          
        
    </div>
</div>