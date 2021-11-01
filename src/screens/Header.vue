<template>
    <nb-header
        iosBarStyle="dark-content"
        androidStatusBarColor="black"
        transparent
    >
        <nb-left>
            <nb-button
                transparent
                :onPress="() => this.props.navigation.openDrawer()"
            >
                <nb-icon name="menu" :style="{ color: 'black' }" />
            </nb-button>
        </nb-left>
        <nb-body> </nb-body>
        <nb-right> </nb-right>
    </nb-header>
</template>

<style>
.text-color-white {
    color: white;
}
</style>
