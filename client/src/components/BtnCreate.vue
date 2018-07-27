<template>
    <div class="buttonCreate">
        <button class= "btncreate">Create Room</button>
    </div>
</template>


<script>
export default {
    
}
</script>

<style>
    .btncreate {
        padding:80px 100px;
        background-color: rgb(128, 128, 128);
        border-radius: 32px;
        font-size: 35px;
        line-height: 65px;
        z-index: 1;
        /* position: fixed; */
    }
    .btncreate:after {
        background-color:rgb(66, 57, 66);
        border-radius: 100px;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        z-index: -1;
    }
    .btncreate:hover {
    box-shadow: 0 0 0 17px rgba(24, 135, 187, 0.15);
    }
    .btncreate:hover {
        background-color: rgb(90, 84, 84);
        color:black;
    }
    .btncreate:hover:after {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>


