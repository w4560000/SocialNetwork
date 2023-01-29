interface JQuery {
    destroy(): void;
    lightSlider(options: DatepickerOptions): JQuery<HTMLElement>;
}

interface DatepickerOptions {
    /**
     * 相本模式
     */
    gallery?: boolean;

    /**
     * 顯示數量
     */
    item?: number;

    /**
     * 無限循環
     */
    loop?: boolean;

    /**
     * 間隔寬度
     * */
    slideMargin?: number;

    /**
     * 當左右拖曳時，則切換上/下項目
     * */
    enableDrag?: boolean;

    /**
     * 滑動速度
     * */
    speed?: number;

    /**
     * 是否自適應高度
     * */
    adaptiveHeight?: boolean;

    /**
     * 
     * */
    autoWidth?: boolean;


    /**
     * 垂直高度
     * */
    verticalHeight?: number;
}