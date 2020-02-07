declare namespace chrome {
  namespace omnibox {
    type OnInputEnteredDisposition =
      | "currentTab"
      | "newForegroundTab"
      | "newBackgroundTab";

    interface SuggestResult {
      content: string;
      description: string;
      deletable?: boolean;
    }

    function setDefaultSuggestion(ds: Pick<SuggestResult, "description">): void;

    namespace onInputStated {
      function addListener(cb: () => void): void;
    }

    namespace onInputChanged {
      function addListener(
        cb: (input: string, suggest: (sr: SuggestResult[]) => void) => void
      ): void;
    }

    namespace onInputEntered {
      function addListener(
        cb: (text: string, disposition: OnInputEnteredDisposition) => void
      ): void;
    }

    namespace onInputCancelled {
      function addListener(cb: () => void): void;
    }

    namespace onDeleteSuggestion {
      function addListener(cb: (text: string) => void): void;
    }
  }

  namespace tabs {
    interface CreateProperties {
      windowId?: number;
      index?: number;
      url?: string;
      active?: boolean;
      pinned?: boolean;
      openerTabId?: number;
    }

    function create(cp: CreateProperties): void;

    interface UpdateProperties {
      url?: string;
      active?: boolean;
      highlighted?: boolean;
      pinned?: boolean;
      muted?: boolean;
      openerTabId?: number;
      autoDiscardable?: boolean;
    }

    function update(tabId: number, up: UpdateProperties): void;
    function update(up: UpdateProperties): void;
  }
}
