#include <bits/stdc++.h>
#define maxn 1000003
#define maxc 1000000003

using namespace std;

int n, a[maxn], m;

int main()
{
   freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    int n;
    cin >> n >> m;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    for(int i=n+1; i<=n+m; i++)
        cin >> a[i];
    sort(a+1, a+n+m+1);
    for(int i=1; i<=n+m; i++)
        cout << a[i] << " ";
}
