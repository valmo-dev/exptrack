import { defineStore } from "pinia";

export const useBudgetStore = defineStore('budget', {
    state: () => {
        const savedState = localStorage.getItem('budgetStore')
        return savedState ? JSON.parse(savedState) : {
        // * Chaque élément aura : type (revenu/charge), catégorie et montant
        items: [],
        // * Taux d'épargne individuels par défaut (30%)
        savingRateMarine: 30,
        savingRateValentin: 30,
        // * Répartition des charges communes (modifiable)
        communalChargesDistribution: { Marine: 60, Valentin: 40 },
        }
    },
    
    getters: {
        totalRevenusMarine(state) {
            return state.items
            .filter((item) => item.type.toLowerCase() === 'revenu' && item.owner.toLowerCase() === 'marine')
            .reduce((sum, item) => sum + Number(item.amount), 0)
        },
        totalRevenusValentin(state) {
            return state.items
            .filter((item) => item.type.toLowerCase() === 'revenu' && item.owner.toLowerCase() === 'valentin')
            .reduce((sum, item) => sum + Number(item.amount), 0)
        },
        totalCharges(state) {
            return state.items
            .filter((item) => item.type.toLowerCase() === 'charge')
            .reduce((sum, item) => sum + Number(item.amount), 0)
        },

        totalPersonalChargesMarine(state) {
            return state.items
            .filter((item) => item.type.toLowerCase() === 'charge' && item.owner.toLowerCase() === 'marine')
            .reduce((sum, item) => sum + Number(item.amount), 0)
        },
        totalPersonalChargesValentin(state) {
            return state.items
            .filter((item) => item.type.toLowerCase() === 'charge' && item.owner.toLowerCase() === 'valentin')
            .reduce((sum, item) => sum + Number(item.amount), 0)
        },
        totalCommunalCharges(state) {
            return state.items
            .filter((item) => item.type.toLowerCase() === 'charge' && item.owner.toLowerCase() === 'commun')
            .reduce((sum, item) => sum + Number(item.amount), 0)
        },
        restBudget() {
            return this.totalRevenus - this.totalCharges
        },
        // savingPotential() {
        //     return this.restBudget * (this.savingRate / 100)
        // },
        ownerTotals(state) {
            return state.items.reduce((acc, item) => {
                acc[item.owner] = (acc[item.owner] || 0) + Number(item.amount);
                return acc;
            }, {})
        },
        contributions() {
            return {
                Marine: this.totalRevenusMarine,
                Valentin: this.totalRevenusValentin,
            }

        },
        effectiveChargesMarine() {
            return (
                this.totalPersonalChargesMarine +
                this.totalCommunalCharges * (this.communalChargesDistribution.Marine / 100)
            )
        },
        effectiveChargesValentin() {
            return (
                this.totalPersonalChargesValentin +
                this.totalCommunalCharges * (this.communalChargesDistribution.Valentin / 100)
            )
        },
        netMarine() {
            return this.contributions.Marine - this.effectiveChargesMarine
        },
        netValentin() {
            return this.contributions.Valentin - this.effectiveChargesValentin
        },
        savingPotentialMarine() {
            return Number((this.netMarine * (this.savingRateMarine / 100)).toFixed(2))
        },
        savingPotentialValentin() {
            return Number((this.netValentin * (this.savingRateValentin / 100)).toFixed(2))
        },
        remainingAfterSavingMarine() {
            return Number((this.netMarine - this.savingPotentialMarine).toFixed(2))
        },
        remainingAfterSavingValentin() {
            return Number((this.netValentin - this.savingPotentialValentin).toFixed(2))
        },
    },

    actions: {
        saveState() {
            localStorage.setItem('budgetStore', JSON.stringify(this.$state))
        },
        addItem(item) {
            this.items.push(item);
            this.saveState();
        },
        deleteItem(index) {
            this.items.splice(index, 1);
            this.saveState();
        },
        editItem(index, updatedItem) {
            this.items.splice(index, 1, updatedItem);
            this.saveState();
        },
        setSavingRateMarine(rate) {
            this.savingRateMarine = Number(rate);
            this.saveState();
        },
        setSavingRateValentin(rate) {
            this.savingRateValentin = Number(rate);
            this.saveState();
        },
        setCommunalChargesDistribution(distribution) {
            this.communalChargesDistribution = distribution;
            this.saveState();
        }
    }
})
