<template>
    <div class="join">
        <div class="col m12 s12">

        <table class="table">
            <tr>
            <th>Name Room</th>
            <th>Player</th>
            <th>Join</th>
            </tr>
            <tr>
            <td>room 1</td>
            <td>1/2</td>
            <td><button class="button-join">JOIN</button></td>
            </tr>
            <tr>
            <td>room 2</td>
            <td>1/2</td>
            <td><button class="button-join">JOIN</button></td>
            </tr>
            </table>
        </div>
    </div>
</template>


<script>
export default {
    name:'join',
    data (){
        // nama : ["a","b","c"]
    }
}
</script>

<style>
    .table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 3px 1px #ddd;
    overflow: hidden;
    border:10px solid #fff;
    font-size: 25px
    }
    .table th,.table td{
    vertical-align: top;
    padding:10px 7px;
    text-align:left;
    margin:0;
    }
.table tbody tr:nth-child(odd) { /* Make table like zebra */
background:#eee;
}

.button-join{

        padding:10px 30px;
        background-color: rgb(202, 92, 92);
        border-radius: 10px;
        font-size: 15px;
        /* line-height: 65px; */
        z-index: 1;
}
    
</style>


