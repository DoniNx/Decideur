<script>
    import Chart from "chart.js/auto";
    import {createEventDispatcher, onMount} from "svelte"
    export let chartData;
    export let final;
    let ctx;
    const dispatch = createEventDispatcher()

    function closeChart() {
      dispatch('closeChart');
    }
    
onMount(async ()=>{
    let myChart = new Chart(
  ctx,
  {
  type: 'radar',
  data: chartData,
  }
  );
  })

  

    

    

</script>

<div class="flex flex-col justify-center align-middle w-screen h-screen bg-slate-700/40 absolute top-0 left-0" on:click|self={closeChart}>
  <div class="w-1/2 self-center bg-slate-100 flex flex-col justify-center align-middle pt-10 rounded-lg">
    <button class="self-end text-2xl mx-12" on:click|self={closeChart}>❎</button>
    <canvas id="myChart" class="self-center" width="500" height="500" bind:this={ctx}></canvas>
    <div class="bg-slate-900 rounded-b-lg px-5 py-6">
      <span class="text-3xl text-yellow-400">Score</span> 
      <span class="text-2xl font-bold text-white px-3">{final.score}</span> 
      <br>
      <span class="text-xl text-white">{final.name}</span>
      
    </div>
  </div>

</div>

<style>
  #myChart{
    max-width: 500px;
    max-height: 500px;
  }
</style>