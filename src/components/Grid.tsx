type GridProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
};

export function Grid<T extends object>({
  items,
  renderItem,
  renderEmpty,
}: GridProps<T>) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {items.length
        ? items.map((item, index) => {
            return (
              <div
                key={index}
                className="min-h-[400px] w-full [&>*]:h-full [&>*]:w-full"
              >
                {renderItem(item, index)}
              </div>
            );
          })
        : renderEmpty?.() ?? null}
    </div>
  );
}
