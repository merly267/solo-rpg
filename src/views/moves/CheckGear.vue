<script setup lang="ts">
import { ref, computed } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import { movesList } from '@/moves'

const move = movesList.checkGear
const characterStore = useCharacterStore()

const selectedSupplyType = ref<string>('Equipped')

const selectedSupplyScore = computed(() => {
  if (selectedSupplyType.value === 'Hold') {
    return characterStore.hold
  } else {
    return characterStore.supply
  }
})

const moveAdds = 0
</script>

<template>
  <MoveLayout>
    <template #text>
      <pre>selectedSupplyType: {{ selectedSupplyType }}</pre>
      <ActionMove :title="move.title" :stat="selectedSupplyScore" :adds="moveAdds">
        <fieldset>
          <div>
            <input
              type="radio"
              name="chooseSupply"
              id="equipped"
              value="Equipped"
              v-model="selectedSupplyType"
            />
            <label for="equipped">Equipped supply ({{ characterStore.supply }})</label>
          </div>
          <div>
            <input
              type="radio"
              name="chooseSupply"
              id="hold"
              value="Hold"
              v-model="selectedSupplyType"
            />
            <label for="hold">Hold supply ({{ characterStore.hold }})</label>
          </div>
        </fieldset>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +supply ({{ selectedSupplyScore }}).
        </p>
      </ActionMove>
    </template>
  </MoveLayout>
</template>
