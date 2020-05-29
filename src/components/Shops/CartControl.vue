<template>
    <div class="cartcontrol">
        <transition name="move" mode="out-in">
        <span
                @click.stop="decreaseCount"
                class="cartbutton button-minus" v-show="food.count>0"
        >
            <i class="fa fa-minus"></i>
        </span>
        </transition>
        <span class="cartcount" v-show="food.count>0">{{food.count}}</span>
        <span
                @click.stop="increaseCount"
                class="cartbutton"
        >
            <i class="fa fa-plus-circle"></i>
        </span>
    </div>
</template>

<script>
    export default {
        name: "CartControl",
        props: {
            food: Object
        },
        methods: {
            decreaseCount() {
                this.food.count--;
            },
            increaseCount() {
                this.food.count++;
            }
        }
    }
</script>

<style scoped>
    .cartcontrol {
        display: inline-flex;
        align-items: center;
    }

    .cartbutton {
        display: inline-block;
        vertical-align: middle;
    }

    .cartbutton i {
        color: rgb(35, 149, 255);
        vertical-align: middle;
        font-size: 1.5rem;
    }

    .button-minus {
        width: 4.866667vw;
        height: 4.866667vw;
        border: 1px solid rgb(35, 149, 255);
        border-radius: 50%;
        text-align: center;
        opacity: 1;
        transform: rotate(0deg)
    }

    .button-minus i {
        font-size: 1rem;
    }


    /*!*动画*!*/
    .move-enter {
        /*transform: translate3d(2rem, 0, 0) rotate(180deg);*/
        /*opacity: 0;*/
    }

    .move-enter-active {
        animation: slide-in 1s ease-out;
        transition: opacity .5s ease-in-out;
    }
    .move-enter-to{
        transform: scale(2);
        opacity: 1;
    }

    .move-leave-active {
        animation: slide-out 1s ease-out ;
        transition: opacity .5s ease-in-out;
    }

    .move-leave-to {
        transform: translateX(0) rotate(0deg);
        opacity: 0;
    }

    @keyframes slide-in {
        from {
            transform: translate3d(2rem,0,0) rotate(180deg);
        }
        to {
            transform: translateX(0) rotate(0deg);
        }

    }

    @keyframes slide-out {
        from {
            transform: translateX(0) rotate(0deg)
        }
        to {
            transform: translate3d(1rem,0,0) rotate(180deg)
        }

    }

    .cartcount {
        display: inline-block;
        text-align: center;
        color: rgba(0, 0, 0, 0.87);
        vertical-align: middle;
        font-size: 0.8rem;
        width: 6.933333vw;
        overflow: hidden;
    }
</style>
