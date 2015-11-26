var loadingTpl = _.template([
'    <div class="sequence">',
'      <div class="seq-preloader">',
'        <svg height="16" width="42" class="seq-preload-indicator" xmlns="http://www.w3.org/2000/svg">',
'          <circle class="seq-preload-circle seq-preload-circle-1" cx="4" cy="8" r="4">',
'          </circle>',
'          <circle class="seq-preload-circle seq-preload-circle-2" cx="17" cy="8" r="6">',
'          </circle>',
'          <circle class="seq-preload-circle seq-preload-circle-3" cx="34" cy="8" r="8">',
'          </circle>',
'        </svg>',
'      </div>',
'    </div>'
].join(''));