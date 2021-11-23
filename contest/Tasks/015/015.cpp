#include <bits/stdc++.h>

using namespace std;

const int N = 110;

int n, m;
int a[N], b[N];

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%d %d", &n, &m);
  for (int i = 1; i <= n; i++) {
    scanf("%d %d", a + i, b + i);
  }
  for (int i = 1; i <= m; i++) {
    int op, x, y;
    scanf("%d %d %d", &op, &x, &y);
    if (op == 1) {
      b[x] += y;
    } else {
      b[x] -= y;
      if (b[x] < a[x]) {
        cout << "BUY " << x << " " << a[x] - b[x] << endl;
      }
    }
  }
  return 0;
}
