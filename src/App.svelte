<script>
  import Overview from './lib/Overview.svelte';
  let state;
  $: state = {
    currentSelection: 'utility'
  };
</script>

<main>
  <h1>📈 Living Expenses 📈</h1>

  <div class='vis-select'>
    <button on:click={() => state.currentSelection = 'utility'}>Utility Overview</button>
    <button on:click={() => state.currentSelection = 'food'}>Food Cost</button>
  </div>
  {#if state.currentSelection === 'utility'}
    <Overview overviewType='Utility' />
  {:else if state.currentSelection === 'food'}
    <Overview overviewType='Food'/>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #79ADDC;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
