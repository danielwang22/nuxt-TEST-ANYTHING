<!-- useDiscount.ts 測試頁面 -->
<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-6">折扣轉換測試頁面</h1>

        <!-- spokenToDecimal 測試區域 -->
        <div class="mb-8 p-4 border rounded-lg">
            <h2 class="text-xl font-semibold mb-4">口語化折扣轉小數測試</h2>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">輸入 1（如：9折）</label>
                    <input
                        v-model="spokenToDecimalInput1"
                        type="number"
                        class="border py-3 px-2 w-xl rounded-lg"
                        placeholder="請輸入口語化折扣"
                    />
                    <div class="mt-2">結果：{{ spokenToDecimalResult1 }}</div>
                </div>
                <div>
                    <label class="block mb-2">輸入 2（如：95折）</label>
                    <input
                        v-model="spokenToDecimalInput2"
                        type="number"
                        class="border py-3 px-2 w-xl rounded-lg"
                        placeholder="請輸入口語化折扣"
                    />
                    <div class="mt-2">結果：{{ spokenToDecimalResult2 }}</div>
                </div>
            </div>
        </div>

        <!-- decimalToSpoken 測試區域 -->
        <div class="mb-8 p-4 border rounded-lg">
            <h2 class="text-xl font-semibold mb-4">小數轉口語化折扣測試</h2>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">第一輸入 1（如：0.9）</label>
                    <input
                        v-model="decimalToSpokenInput1"
                        type="number"
                        step="0.01"
                        class="border py-3 px-2 w-xl rounded-lg"
                        placeholder="請輸入小數折扣"
                    />
                    <div class="mt-2">結果：{{ decimalToSpokenResult1 }}</div>
                </div>
                <div>
                    <label class="block mb-2">輸入 2（如：0.95）</label>
                    <input
                        v-model="decimalToSpokenInput2"
                        type="number"
                        step="0.01"
                        class="border py-3 px-2 w-xl rounded-lg"
                        placeholder="請輸入小數折扣"
                    />
                    <div class="mt-2">結果：{{ decimalToSpokenResult2 }}</div>
                </div>
            </div>
        </div>

        <!-- convertDiscount 整數百分比測試區域 -->
        <div class="mb-8 p-4 border rounded-lg">
            <h2 class="text-xl font-semibold mb-4">整數百分比轉換測試</h2>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">輸入值 1（如：90）</label>
                    <input
                        v-model="integerInput1"
                        type="number"
                        class="border p-2 w-full max-w-full mb-2"
                        placeholder="請輸入數值"
                    />
                    <Listbox v-model="integerFromType1" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ integerFromType1.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <Listbox v-model="integerToType1" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ integerToType1.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <div class="mt-2">結果：{{ integerResult1 }}</div>
                </div>
                <div>
                    <label class="block mb-2">輸入值 2（如：95）</label>
                    <input
                        v-model="integerInput2"
                        type="number"
                        class="border p-2 w-full max-w-full mb-2"
                        placeholder="請輸入數值"
                    />
                    <Listbox v-model="integerFromType2" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ integerFromType2.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <Listbox v-model="integerToType2" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ integerToType2.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <div class="mt-2">結果：{{ integerResult2 }}</div>
                </div>
            </div>
        </div>

        <!-- convertDiscount 小數百分比測試區域 -->
        <div class="mb-8 p-4 border rounded-lg">
            <h2 class="text-xl font-semibold mb-4">小數百分比轉換測試</h2>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">輸入值 1（如：0.9）</label>
                    <input
                        v-model="decimalInput1"
                        type="number"
                        step="0.01"
                        class="border p-2 w-full max-w-full mb-2"
                        placeholder="請輸入數值"
                    />
                    <Listbox v-model="decimalFromType1" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ decimalFromType1.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <Listbox v-model="decimalToType1" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ decimalToType1.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <div class="mt-2">結果：{{ decimalResult1 }}</div>
                </div>
                <div>
                    <label class="block mb-2">輸入值 2（如：0.95）</label>
                    <input
                        v-model="decimalInput2"
                        type="number"
                        step="0.01"
                        class="border p-2 w-full max-w-full mb-2"
                        placeholder="請輸入數值"
                    />
                    <Listbox v-model="decimalFromType2" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ decimalFromType2.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <Listbox v-model="decimalToType2" as="div" class="relative mb-2">
                        <ListboxButton
                            class="w-full border p-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            {{ decimalToType2.label }}
                        </ListboxButton>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions
                                class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                            >
                                <ListboxOption
                                    v-for="option in discountTypeOptions"
                                    :key="option.value"
                                    v-slot="{ active, selected }"
                                    :value="option"
                                    as="template"
                                >
                                    <li
                                        :class="[
                                            'p-2 cursor-pointer',
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                            selected ? 'font-bold' : ''
                                        ]"
                                    >
                                        {{ option.label }}
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                    <div class="mt-2">結果：{{ decimalResult2 }}</div>
                </div>
            </div>
        </div>

        <!-- formatDiscount 測試區域 -->
        <div class="mb-8 p-4 border rounded-lg">
            <h2 class="text-xl font-semibold mb-4">折扣格式化測試</h2>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">輸入值 1（如：90）</label>
                    <input
                        v-model="formatInput1"
                        type="number"
                        class="border p-2 w-full max-w-full mb-2"
                        placeholder="請輸入數值"
                    />
                    <div class="flex gap-2 mb-2">
                        <Switch
                            v-model="formatIncludeSymbol1"
                            :class="formatIncludeSymbol1 ? 'bg-blue-500' : 'bg-gray-300'"
                            class="relative inline-flex h-[22px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                :class="formatIncludeSymbol1 ? 'translate-x-26px' : 'translate-x-0'"
                                class="pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                            ></span>
                        </Switch>
                    </div>
                    <div class="mt-2">結果：{{ formatResult1 }}</div>
                </div>
                <div>
                    <label class="block mb-2">輸入值 2（如：95）</label>
                    <input
                        v-model="formatInput2"
                        type="number"
                        class="border p-2 w-full max-w-full mb-2"
                        placeholder="請輸入數值"
                    />
                    <div class="flex gap-2 mb-2">
                        <Switch
                            v-model="formatIncludeSymbol2"
                            :class="formatIncludeSymbol2 ? 'bg-blue-500' : 'bg-gray-300'"
                            class="relative inline-flex h-[22px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                :class="formatIncludeSymbol2 ? 'translate-x-26px' : 'translate-x-0'"
                                class="pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                            ></span>
                        </Switch>
                    </div>
                    <div class="mt-2">結果：{{ formatResult2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useDiscount } from '~/composables/useDiscount';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Switch } from '@headlessui/vue';

const { spokenToDecimal, decimalToSpoken, convertDiscount, formatDiscount } = useDiscount();

const discountTypeOptions = [
    { value: 'main', label: '主折數' },
    { value: 'subtract', label: '被折數' },
    { value: 'spoken', label: '口語化' }
];

// spokenToDecimal 測試
const spokenToDecimalInput1 = ref<number>();
const spokenToDecimalInput2 = ref<number>();

const spokenToDecimalResult1 = computed(() => {
    try {
        return spokenToDecimalInput1.value ? spokenToDecimal(spokenToDecimalInput1.value) : '';
    } catch {
        return '輸入錯誤';
    }
});

const spokenToDecimalResult2 = computed(() => {
    try {
        return spokenToDecimalInput2.value ? spokenToDecimal(spokenToDecimalInput2.value) : '';
    } catch {
        return '輸入錯誤';
    }
});

// decimalToSpoken 測試
const decimalToSpokenInput1 = ref<number>();
const decimalToSpokenInput2 = ref<number>();

const decimalToSpokenResult1 = computed(() => {
    try {
        return decimalToSpokenInput1.value ? decimalToSpoken(decimalToSpokenInput1.value) : '';
    } catch {
        return '輸入錯誤';
    }
});

const decimalToSpokenResult2 = computed(() => {
    try {
        return decimalToSpokenInput2.value ? decimalToSpoken(decimalToSpokenInput2.value) : '';
    } catch {
        return '輸入錯誤';
    }
});

// convertDiscount 整數百分比測試
const integerInput1 = ref<number>();
const integerInput2 = ref<number>();
const integerFromType1 = ref(discountTypeOptions[0]);
const integerFromType2 = ref(discountTypeOptions[0]);
const integerToType1 = ref(discountTypeOptions[2]);
const integerToType2 = ref(discountTypeOptions[2]);

const integerResult1 = computed(() => {
    try {
        return integerInput1.value
            ? convertDiscount(integerInput1.value, {
                  fromType: integerFromType1.value.value as 'main' | 'subtract' | 'spoken',
                  toType: integerToType1.value.value as 'main' | 'subtract' | 'spoken',
                  fromFormat: 'integer',
                  toFormat: 'integer'
              })
            : '';
    } catch {
        return '輸入錯誤';
    }
});

const integerResult2 = computed(() => {
    try {
        return integerInput2.value
            ? convertDiscount(integerInput2.value, {
                  fromType: integerFromType2.value.value as 'main' | 'subtract' | 'spoken',
                  toType: integerToType2.value.value as 'main' | 'subtract' | 'spoken',
                  fromFormat: 'integer',
                  toFormat: 'integer'
              })
            : '';
    } catch {
        return '輸入錯誤';
    }
});

// convertDiscount 小數百分比測試
const decimalInput1 = ref<number>();
const decimalInput2 = ref<number>();
const decimalFromType1 = ref(discountTypeOptions[0]);
const decimalFromType2 = ref(discountTypeOptions[0]);
const decimalToType1 = ref(discountTypeOptions[2]);
const decimalToType2 = ref(discountTypeOptions[2]);

const decimalResult1 = computed(() => {
    try {
        return decimalInput1.value
            ? convertDiscount(decimalInput1.value, {
                  fromType: decimalFromType1.value.value as 'main' | 'subtract' | 'spoken',
                  toType: decimalToType1.value.value as 'main' | 'subtract' | 'spoken',
                  fromFormat: 'decimal',
                  toFormat: 'decimal'
              })
            : '';
    } catch {
        return '輸入錯誤';
    }
});

const decimalResult2 = computed(() => {
    try {
        return decimalInput2.value
            ? convertDiscount(decimalInput2.value, {
                  fromType: decimalFromType2.value.value as 'main' | 'subtract' | 'spoken',
                  toType: decimalToType2.value.value as 'main' | 'subtract' | 'spoken',
                  fromFormat: 'decimal',
                  toFormat: 'decimal'
              })
            : '';
    } catch {
        return '輸入錯誤';
    }
});

// formatDiscount 測試
const formatInput1 = ref<number>();
const formatInput2 = ref<number>();
const formatIncludeSymbol1 = ref(true);
const formatIncludeSymbol2 = ref(false);

const formatResult1 = computed(() => {
    try {
        return formatInput1.value !== undefined
            ? formatDiscount(formatInput1.value, 'main', 'integer', formatIncludeSymbol1.value)
            : '';
    } catch {
        return '輸入錯誤';
    }
});

const formatResult2 = computed(() => {
    try {
        return formatInput2.value !== undefined
            ? formatDiscount(formatInput2.value, 'main', 'integer', formatIncludeSymbol2.value)
            : '';
    } catch {
        return '輸入錯誤';
    }
});
</script>

<style scoped>
input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}
</style>
