/**
 * useDiscount.ts
 * Nuxt 3.14 Composable Hook 用於折扣轉換
 * 放置於 composables 目錄中
 */

/**
 * 檢查值是否為數字
 * @param {unknown} value - 要檢查的值
 * @returns {boolean} 是否為數字
 */
const isNumber = (value: unknown): boolean => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * 檢查數字是否為 -10 到 10 範圍內的數字（含 -10 和 10）
 * @param {unknown} value - 要檢查的值
 * @returns {boolean} 是否為 -10 到 10 範圍內的數字
 */
const isWithinTen = (value: unknown): boolean => {
    return isNumber(value) && (value as number) >= -10 && (value as number) <= 10;
};

/**
 * 折扣轉換 Composable Hook
 */
export const useDiscount = () => {
    /**
     * 將口語化折扣轉換為小數形式
     * @param {number} discount - 口語化折扣值（如9折、95折）
     * @returns {number} 折扣的小數表示（如0.9、0.95）
     */
    const spokenToDecimal = (discount: number): number => {
        if (!isNumber(discount)) {
            throw new Error('輸入必須是有效數字');
        }

        // 處理正負號
        const sign = Math.sign(discount);
        const absDiscount = Math.abs(discount);

        // 判斷是十分制還是百分制
        if (absDiscount <= 10) {
            // 十分制：直接除以10
            return sign * (absDiscount / 10);
        } else {
            // 百分制：除以100
            return sign * (absDiscount / 100);
        }
    };

    /**
     * 將小數折扣轉換為口語化表示
     * @param {number} decimal - 折扣的小數表示（如0.9、0.95、0.09）
     * @returns {number} 口語化折扣值（如9折、95折、0.9折）
     */
    const decimalToSpoken = (decimal: number): number => {
        console.log(decimal);
        if (!isNumber(decimal)) {
            throw new Error('輸入必須是有效數字');
        }

        // 處理正負號
        const sign = Math.sign(decimal);
        const absDecimal = Math.abs(decimal);

        let result: number;
        // 判斷不同範圍的處理方式
        if (absDecimal < 0.1) {
            // 小於 0.1 的情況，保持一位小數，Ex. 0.09 -> 0.90 折
            result = sign * (absDecimal * 10);
        } else if (absDecimal <= 1) {
            // 0.1 到 1 的情況，轉為百分制，Ex. 0.9 -> 9.00 折
            const tempResult = sign * (absDecimal * 100);
            // 如果是 10 的倍數（如 90、80、70...），則簡化（如 9、8、7...）
            // Ex. 0.9 -> 90 折 -> 9.00 折
            result = tempResult % 10 === 0 ? tempResult / 10 : tempResult;
        } else {
            // 大於 1 的情況，直接返回百分制，Ex. 1.2 -> 120.00 折
            result = sign * (absDecimal * 100);
        }

        // 將結果轉換為保留兩位小數的浮點數
        return Number(result.toFixed(2));
    };

    /**
     * 計算主折數和被折數（整數百分比）
     * @param {number} value - 輸入值
     * @param {string} type - 輸入值類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} targetType - 目標類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @returns {number} 轉換後的整數百分比
     */
    const convertIntegerPercentage = (value: number, type: string, targetType: string): number => {
        if (!isNumber(value)) {
            throw new Error('輸入必須是有效數字');
        }

        // 無需轉換
        if (type === targetType) {
            return value;
        }

        // 先將所有類型轉換為主折數 (整數百分比)
        let mainPercentage: number;

        switch (type) {
            case 'main':
                mainPercentage = value;
                break;
            case 'subtract':
                mainPercentage = Number((100 - value).toFixed(2));
                break;
            case 'spoken':
                // 口語化轉主折數
                mainPercentage = Math.round(spokenToDecimal(value) * 100);
                break;
            default:
                throw new Error('無效的輸入類型');
        }

        // 從主折數轉換為目標類型
        switch (targetType) {
            case 'main':
                return mainPercentage;
            case 'subtract':
                return Number((100 - mainPercentage).toFixed(2));
            case 'spoken':
                // 主折數轉口語化
                return decimalToSpoken(mainPercentage / 100);
            default:
                throw new Error('無效的目標類型');
        }
    };

    /**
     * 計算主折數和被折數（小數百分比）
     * @param {number} value - 輸入值
     * @param {string} type - 輸入值類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} targetType - 目標類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @returns {number} 轉換後的小數百分比
     */
    const convertDecimalPercentage = (value: number, type: string, targetType: string): number => {
        if (!isNumber(value)) {
            throw new Error('輸入必須是有效數字');
        }

        // 無需轉換
        if (type === targetType) {
            return value;
        }

        // 先將所有類型轉換為主折數 (小數百分比)
        let mainDecimal: number;

        switch (type) {
            case 'main':
                mainDecimal = value;
                break;
            case 'subtract':
                mainDecimal = Number((1 - value).toFixed(2));
                break;
            case 'spoken':
                // 口語化轉小數
                mainDecimal = spokenToDecimal(value);
                break;
            default:
                throw new Error('無效的輸入類型');
        }

        // 從主折數轉換為目標類型
        switch (targetType) {
            case 'main':
                return mainDecimal;
            case 'subtract':
                return Number((1 - mainDecimal).toFixed(2));
            case 'spoken':
                // 小數轉口語化
                return decimalToSpoken(mainDecimal);
            default:
                throw new Error('無效的目標類型');
        }
    };

    /**
     * 在整數百分比和小數百分比之間轉換
     * @param {number} value - 輸入值
     * @param {string} fromFormat - 輸入格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @param {string} toFormat - 目標格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {number} 轉換後的值
     */
    const convertPercentageFormat = (value: number, fromFormat: string, toFormat: string): number => {
        if (!isNumber(value)) {
            throw new Error('輸入必須是有效數字');
        }

        // 無需轉換
        if (fromFormat === toFormat) {
            return value;
        }

        if (fromFormat === 'integer' && toFormat === 'decimal') {
            // 整數百分比轉小數百分比
            return value / 100;
        } else if (fromFormat === 'decimal' && toFormat === 'integer') {
            // 小數百分比轉整數百分比
            return value * 100;
        } else {
            throw new Error('無效的格式類型');
        }
    };

    /**
     * 主要折扣轉換函數
     * @param {number} value - 要轉換的值
     * @param {object} options - 轉換選項
     * @param {string} options.fromType - 輸入值類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} options.toType - 目標類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} options.fromFormat - 輸入格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @param {string} options.toFormat - 目標格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {number} 轉換後的折扣值
     */
    const convertDiscount = (
        value: number,
        options: {
            fromType: 'main' | 'subtract' | 'spoken';
            toType: 'main' | 'subtract' | 'spoken';
            fromFormat: 'integer' | 'decimal';
            toFormat: 'integer' | 'decimal';
        }
    ): number => {
        if (!isNumber(value)) {
            throw new Error('輸入必須是有效數字');
        }

        const { fromType, toType, fromFormat, toFormat } = options;

        // 1. 如果輸入是口語化，先轉換為主折數或被折數
        let intermediateValue: number;

        if (fromFormat === toFormat) {
            // 相同格式下的類型轉換
            if (fromFormat === 'integer') {
                intermediateValue = convertIntegerPercentage(value, fromType, toType);
            } else {
                intermediateValue = convertDecimalPercentage(value, fromType, toType);
            }
        } else {
            // 需要進行格式轉換
            // 先在原格式下進行類型轉換
            if (fromFormat === 'integer') {
                intermediateValue = convertIntegerPercentage(value, fromType, toType);
            } else {
                intermediateValue = convertDecimalPercentage(value, fromType, toType);
            }

            // 然後進行格式轉換
            intermediateValue = convertPercentageFormat(intermediateValue, fromFormat, toFormat);
        }

        return intermediateValue;
    };

    /**
     * 快速取得折扣的相反形式（主折數↔被折數）
     * @param {number} value - 折扣值
     * @param {string} format - 格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {number} 相反形式的折扣值
     */
    const getOppositeDiscount = (value: number, format: 'integer' | 'decimal'): number => {
        if (!isNumber(value)) {
            throw new Error('輸入必須是有效數字');
        }

        if (format === 'integer') {
            return 100 - value;
        } else {
            return 1 - value;
        }
    };

    /**
     * 將口語化折扣轉換為主折數或被折數
     * @param {number} spokenDiscount - 口語化折扣值
     * @param {string} targetType - 目標類型: 'main' (主折數), 'subtract' (被折數)
     * @param {string} format - 目標格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {number} 轉換後的折扣值
     */
    const spokenDiscountTo = (spokenDiscount: number, targetType: 'main' | 'subtract', format: 'integer' | 'decimal'): number => {
        return convertDiscount(spokenDiscount, {
            fromType: 'spoken',
            toType: targetType,
            fromFormat: 'integer', // 口語化輸入總是視為整數格式
            toFormat: format
        });
    };

    /**
     * 將主折數或被折數轉換為口語化折扣
     * @param {number} discount - 折扣值
     * @param {string} fromType - 輸入類型: 'main' (主折數), 'subtract' (被折數)
     * @param {string} format - 輸入格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {number} 口語化折扣值
     */
    const toSpokenDiscount = (discount: number, fromType: 'main' | 'subtract', format: 'integer' | 'decimal'): number => {
        return convertDiscount(discount, {
            fromType,
            toType: 'spoken',
            fromFormat: format,
            toFormat: 'integer' // 口語化輸出總是整數格式
        });
    };

    /**
     * 計算打折後的價格
     * @param {number} originalPrice - 原始價格
     * @param {number} discount - 折扣值
     * @param {string} type - 折扣類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} format - 折扣格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {number} 折扣後的價格
     */
    const calculateDiscountedPrice = (
        originalPrice: number,
        discount: number,
        type: 'main' | 'subtract' | 'spoken',
        format: 'integer' | 'decimal'
    ): number => {
        if (!isNumber(originalPrice) || !isNumber(discount)) {
            throw new Error('輸入必須是有效數字');
        }

        // 將折扣轉換為主折數的小數格式
        const mainDecimalDiscount = convertDiscount(discount, {
            fromType: type,
            toType: 'main',
            fromFormat: format,
            toFormat: 'decimal'
        });

        // 計算折扣後價格
        return originalPrice * mainDecimalDiscount;
    };

    /**
     * 驗證折扣值是否有效
     * @param {number} discount - 折扣值
     * @param {string} type - 折扣類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} format - 折扣格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @returns {boolean} 折扣值是否有效
     */
    const isValidDiscount = (discount: number, type: 'main' | 'subtract' | 'spoken', format: 'integer' | 'decimal'): boolean => {
        if (!isNumber(discount)) {
            return false;
        }

        // 檢查基本有效性
        try {
            // 嘗試轉換為主折數的小數格式，如果成功則視為有效
            convertDiscount(discount, {
                fromType: type,
                toType: 'main',
                fromFormat: format,
                toFormat: 'decimal'
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    /**
     * 格式化折扣顯示
     * @param {number} discount - 折扣值
     * @param {string} type - 折扣類型: 'main' (主折數), 'subtract' (被折數), 'spoken' (口語化)
     * @param {string} format - 折扣格式: 'integer' (整數百分比), 'decimal' (小數百分比)
     * @param {boolean} includeSymbol - 是否包含百分比符號或"折"字
     * @returns {string} 格式化後的折扣字串
     */
    const formatDiscount = (
        discount: number,
        type: 'main' | 'subtract' | 'spoken',
        format: 'integer' | 'decimal',
        includeSymbol: boolean = true
    ): string => {
        if (!isNumber(discount)) {
            throw new Error('輸入必須是有效數字');
        }

        // 對於口語化折扣，直接添加"折"字
        if (type === 'spoken') {
            return includeSymbol ? `${discount}折` : `${discount}`;
        }

        // 對於主折數和被折數，轉換為百分比格式
        const percentValue = format === 'integer' ? discount : discount * 100;

        return includeSymbol ? `${percentValue}%` : `${percentValue}`;
    };

    // 返回所有可用的函數
    return {
        convertDiscount,
        getOppositeDiscount,
        spokenDiscountTo,
        toSpokenDiscount,
        calculateDiscountedPrice,
        isValidDiscount,
        formatDiscount,
        spokenToDecimal,
        decimalToSpoken,
        isWithinTen
    };
};

// 默認導出 hook
export default useDiscount;
