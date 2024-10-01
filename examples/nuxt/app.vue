<script setup lang="ts">
import '~build/console';
import { message } from '~build/meta';
import { BUILD_MESSAGE } from '~build/env';

console.log('BUILD_MESSAGE:', BUILD_MESSAGE);
</script>

<template>
  <div>
    <div>
      <span>Message:</span>
      <span>{{ message }}</span>
    </div>
  </div>
</template>
