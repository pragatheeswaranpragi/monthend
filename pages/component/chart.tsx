import React from 'react';

export default function chart(){
    return(
    <>
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div className="bg-gray-800 text-gray-500 rounded shadow-xl py-5 px-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <div className="flex w-full">
            <h3 className="text-lg font-semibold leading-tight flex-1">TOTAL SESSIONS</h3>
            <div className="relative h-5 leading-none">
                <button className="text-xl text-gray-500 hover:text-gray-300 h-6 focus:outline-none">
                    <i className="mdi"></i>
                </button>
            </div>
        </div>
        <div className="relative overflow-hidden transition-all duration-500" x-ref="card" x-bind:style="`max-height:${cardOpen?$refs.card.scrollHeight:0}px; opacity:${cardOpen?1:0}`">
            <div>
                <div className="pb-4 lg:pb-6">
                    <h4 className="text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block" x-ref="total">0</h4>
                </div>
                <div className="pb-4 lg:pb-6">
                    <div className="overflow-hidden rounded-full h-3 bg-gray-800 flex transition-all duration-500">
                        <div x-for="(item,index) in cardData.sessions">
                            <div className="h-full"></div>
                        </div>
                    </div>
                </div>
                <div className="flex -mx-4">
                    <template x-for="(item,index) in cardData.sessions">
                        <div className="w-1/3 px-4 border-l border-gray-700">
                            <div className="text-sm">
                                <span className="inline-block w-2 h-2 rounded-full mr-1 align-middle">&nbsp;</span>
                                <span className="align-middle" x-text="item.label">&nbsp;</span>
                            </div>
                            <div className="font-medium text-lg text-white">
                                <span>0</span>%
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div>
</>
    )
}