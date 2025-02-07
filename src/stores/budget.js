import { defineStore } from "pinia";

export const useBudgetStore = defineStore('budget', {
    state: () => ({
        // * Chaque élément aura : type (revenu/charge), catégorie et montant
        items: [],
        // * Taux d'épargne par défaut (30%)
        savingRate: 0.3,
    }),
    
    getters: {
        totalRevenus: (state) =>
            state.items
            .filter((item) => item.type === 'revenu')
            .reduce((sum, item) => sum + Number(item.montant), 0),
        totalCharges: (state) => 
            state.items
            .filter((item) => item.type === 'charge')
            .reduce((sum, item) => sum + Number(item.montant), 0),
        restBudget: (getters) => getters.totalRevenus - getters.totalCharges,
        savingPotential: (state, getters) => getters.restBudget * state.savingRate,
        contributions: (getters) => {
            return {
                marine: getters.totalRevenus * 0.6,
                valentin: getters.totalRevenus * 0.4,
            }
        }
    },

    actions: {
        addItem(item) {
            this.items.push(item);
        },
        deleteItem(index) {
            this.items.splice(index, 1);
        },
        editItem(index, updatedItem) {
            this.index.splice(index, 1, updatedItem)
        },
        setSavingRate(rate) {
            this.savingRate = rate;
        }
    }
})
