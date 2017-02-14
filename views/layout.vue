<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="/build/bootstrap/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="/css/diner.css">
      <script src="/build/vue/dist/vue.js"></script>
    </head>
    <body>
      <header>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/">Burger Pub</a>
            </div>

            <div class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                <li><a href="/reservation">Boka bord</a></li>
                <li><a href="/order">Lägg beställning</a></li>
                <li><a href="/overview">Lediga bord</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div class="container">
        {{{app}}}
      </div>

      {{{script}}}
    </body>
  </html>
</template>

<script>
</script>

<style>
</style>
