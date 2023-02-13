<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let param = {  };
    let newOption = "";

    function updateOption(event,i) {
		dispatch('updateOption', {
            newTitle: event.target.value,
           i:i});
	}
    function addOption() {
		dispatch('addOption', { title: newOption, val: 1});
	}
    function removePrameter() {
        dispatch('removeParameter');
    }




</script>


<div class="my-10 mx-4  max-w-42 ">
    
    <div class="shadow-2xl singleParameter card bg-blue-300 px-5 max-w-42 py-3 rounded-md">
        <div class="flex flex-row justify-between">
            <h2 class="text-2xl uppercase overflow-hidden">{param.name}</h2>
            <button class="px-1 text-lg rounded-md bg-green-200 focus:outline-none"
                    on:click={removePrameter}>❎</button>
        </div>
        <label for="price">Add category:</label>
        <div class="flex flex-col my-2">

            {#each param.options as option, i (option.title)}
                <input 
                    type="text" 
                    value="{option.title}" 
                    on:change={(event) => updateOption(event, i)}
                    class="my-1">              
            {/each}
            <input 
                    type="text" 
                    bind:value="{newOption}" 
                    on:keydown={(event) => {
                        if(event.key == "Enter"){
                            addOption(event);
                            newOption = "";
                        }                       
                    }}
                    class="my-1">
        </div>
    </div>

</div>