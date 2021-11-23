#include <bits/stdc++.h>

using namespace std;

const int N = 100010;

int n;
int a[N];

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%d", &n);
  for (int i = 1; i <= n; i++) {
    int u;
    scanf("%d", &u);
    a[u]++;
  }
  for (int i = 1; i < N; i++) {
    if (a[i] == 1) {
      cout << i << endl;
      return 0;
    }
  }
  cout << -1 << endl;
  return 0;
}
