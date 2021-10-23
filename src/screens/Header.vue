<template>
    <nb-header>
        <nb-left>
            <nb-button
                transparent
                :onPress="() => this.props.navigation.openDrawer()"
            >
                <nb-icon name="menu" />
            </nb-button>
        </nb-left>
        <nb-body>
            <nb-text> header </nb-text>
            <!-- @TODO if nb-titel is used font error appears, if switched for nb-text error disappears-->
        </nb-body>
    </nb-header>
</template>
